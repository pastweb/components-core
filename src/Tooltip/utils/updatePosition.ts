import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { TooltipDefaultProps, TooltipMediatorVars } from '../types';

/**
 * Positions the tooltip relative to the visual target with Floating UI.
 *
 * The stored reference is the trigger wrapper. Positioning reads that wrapper's
 * live first element child so a remounted control is not measured as a detached
 * 0×0 box, and a full-width wrapper does not shift top/bottom placement.
 *
 * @example
 * ```ts
 * updatePosition(props, vars);
 * ```
 */
export function updatePosition(
  props: TooltipDefaultProps,
  vars: TooltipMediatorVars,
): void {
  const trigger = vars.triggerReference;
  const tooltip = vars.tooltipReference;
  const arrowEl = vars.arrowReference;
  if (!trigger || !tooltip || !arrowEl) return;

  const child = trigger.firstElementChild as HTMLElement | null;
  const childRect = child?.getBoundingClientRect();
  const target = child
    && child.isConnected
    && childRect
    && childRect.width > 0
    && childRect.height > 0
    ? child
    : trigger;
  const reference = {
    contextElement: target,
    getBoundingClientRect: () => target.getBoundingClientRect(),
  };

  const arrowWidth = parseFloat(getComputedStyle(arrowEl).width) || 0;
  computePosition(reference, tooltip, {
    strategy: 'fixed',
    placement: props.placement,
    middleware: [
      offset((arrowWidth / 2) + props.offset),
      shift({ padding: Math.max(arrowWidth / 2, 8) }),
      arrow({ element: arrowEl }),
      flip(),
    ],
  }).then(({ x, y, placement, middlewareData }) => {
    if (!tooltip.isConnected) return;
    Object.assign(tooltip.style, {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
    });

    const { x: arrowX, y: arrowY } = (middlewareData.arrow || {}) as { x?: number; y?: number };
    const side = placement.split('-')[0];
    const staticSide = {
      top: 'top',
      right: 'left',
      bottom: 'bottom',
      left: 'right',
    }[side] as string;

    const sideValue: Record<string, string> = {
      left: `-${arrowWidth - 2}px`,
      right: `-${arrowWidth - 2}px`,
      top: `${arrowWidth}px`,
      bottom: `-${arrowWidth}px`,
    };

    const arrowDeg: Record<string, number> = {
      top: 180,
      right: 270,
      bottom: 0,
      left: 90,
    };

    Object.assign(arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      [staticSide === 'bottom' ? 'top' : staticSide]: sideValue[staticSide],
      transform: `rotate(${arrowDeg[side]}deg)`,
    });
  });
}
