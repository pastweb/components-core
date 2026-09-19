import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownPointerEvent,
} from '../types';

/**
 * Stores the pointer position from a trigger event for pointer positioning.
 *
 * Coordinates are kept only when `visibleTarget` is `pointer` and the event
 * includes client coordinates, typically from a click, context menu, or hover
 * on the trigger. Keyboard and programmatic opens clear the stored point.
 *
 * @example
 * ```ts
 * setPointerPosition(props, vars, event);
 * ```
 */
export function setPointerPosition(
  props: DropDownDefaultProps,
  vars: DropDownMediatorVars,
  event?: DropDownPointerEvent,
): void {
  if (
    props.visibleTarget !== 'pointer'
    || typeof event?.clientX !== 'number'
    || typeof event?.clientY !== 'number'
  ) {
    vars.pointerPosition = undefined;
    return;
  }

  vars.pointerPosition = { x: event.clientX, y: event.clientY };
}
