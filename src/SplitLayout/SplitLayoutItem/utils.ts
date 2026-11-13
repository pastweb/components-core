import type { SplitLayoutContext } from '../types';
import type {
  SplitLayoutItemDefaultProps,
  SplitLayoutItemMediatorVars,
  SplitLayoutPointerEvent,
} from './types';

function coordinate(context: SplitLayoutContext, event: SplitLayoutPointerEvent): number {
  return context.orientation === 'horizontal' ? event.clientX : event.clientY;
}

/**
 * Starts a pointer-driven resize operation for a layout item.
 *
 * @example
 * onPointerDown(props, context, vars, event);
 */
export function onPointerDown(
  props: SplitLayoutItemDefaultProps,
  context: SplitLayoutContext,
  vars: SplitLayoutItemMediatorVars,
  event: SplitLayoutPointerEvent,
): void {
  if (context.disabled) return;
  event.preventDefault?.();
  event.currentTarget.setPointerCapture?.(event.pointerId);
  vars.lastPosition = coordinate(context, event);
  context.onResizeStart(props.index);
}

/**
 * Applies the pointer movement as a percentage resize delta.
 *
 * @example
 * onPointerMove(context, vars, event);
 */
export function onPointerMove(
  context: SplitLayoutContext,
  vars: SplitLayoutItemMediatorVars,
  event: SplitLayoutPointerEvent,
): void {
  if (vars.lastPosition === null || context.disabled) return;
  const container = event.currentTarget.parentElement;
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const total = context.orientation === 'horizontal' ? rect.width : rect.height;
  if (total <= 0) return;
  const position = coordinate(context, event);
  context.onResize(((position - vars.lastPosition) / total) * 100);
  vars.lastPosition = position;
}

/**
 * Finishes an active pointer-driven resize operation.
 *
 * @example
 * onPointerUp(context, vars, event);
 */
export function onPointerUp(
  context: SplitLayoutContext,
  vars: SplitLayoutItemMediatorVars,
  event: SplitLayoutPointerEvent,
): void {
  if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }
  vars.lastPosition = null;
  context.onResizeEnd();
}
