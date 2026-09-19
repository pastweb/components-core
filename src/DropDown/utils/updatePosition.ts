import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { getVirtualReference } from './getVirtualReference';
import type { DropDownDefaultProps, DropDownMediatorVars } from '../types';

/**
 * Positions open DropDown content relative to its trigger or pointer.
 *
 * @example
 * ```ts
 * updatePosition(props, vars);
 * ```
 */
export function updatePosition(
  props: DropDownDefaultProps,
  vars: DropDownMediatorVars,
): void {
  const container = vars.containerReference;
  const content = vars.contentReference;
  const virtualReference = getVirtualReference(props, vars);
  if (!virtualReference || !container || !content) return;

  const arrowElement = vars.arrowReference;
  const { placement } = props;

  const arrowWidth = arrowElement
    ? parseFloat(getComputedStyle(arrowElement).width)
    : Number.NaN;
  const offsetValue = props.arrow && Number.isFinite(arrowWidth)
    ? arrowWidth / 2
    : props.offset;
  const cs = props.arrow ? getComputedStyle(content) : null;
  const borderWidth = parseFloat(cs?.borderWidth || '') || 0;
  const borderRadius = parseFloat(cs?.borderRadius || '') || 0;
  const height = parseFloat(cs?.height || '') || 0;

  computePosition(virtualReference, container, {
    placement,
    middleware: [
      offset(offsetValue),
      shift({ padding: 3 }),
      ...props.arrow && arrowElement ? [arrow({ element: arrowElement })] : [],
      flip(),
    ],
  }).then(({ x, y, placement: nextPlacement, middlewareData }) => {
    if (!container.isConnected) return;

    if (!props.arrow) {
      Object.assign(container.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
      return;
    }

    const { x: arrowX, y: arrowY } = (middlewareData.arrow || {}) as {
      x?: number;
      y?: number;
    };
    const staticSide = {
      top: 'top',
      right: 'left',
      bottom: 'bottom',
      left: 'right',
    }[nextPlacement.split('-')[0]] as string;

    const sideValue: Record<string, string> = {
      left: `-${(offsetValue * 2) + (borderWidth - (borderRadius / 2))}px`,
      right: `-${(offsetValue * 2) + (borderWidth - (borderRadius / 2))}px`,
      top: `${height}px`,
      bottom: `-${offsetValue * 2}px`,
    };

    const arrowDeg: Record<string, number> = {
      top: 180,
      right: 270,
      bottom: 0,
      left: 90,
    };

    const currPlacement = middlewareData.offset?.placement || nextPlacement;
    const [finalPlacement, position] = currPlacement.split('-');
    const top = arrowY != null
      ? `${!position ? arrowY : position === 'start' ? arrowY - (borderRadius / 2) : arrowY + (borderRadius / 2)}px`
      : '';

    Object.assign(container.style, {
      left: `${finalPlacement === 'left' ? x + (offsetValue - 5) : finalPlacement === 'right' ? x - (offsetValue - 5) : x}px`,
      top: `${!position ? y : position === 'start' ? y + (borderRadius / 2) : y - (borderRadius / 2)}px`,
    });

    if (!arrowElement) return;

    Object.assign(arrowElement.style, {
      top,
      left: arrowX != null
        ? `${finalPlacement === 'left' || finalPlacement === 'right' ? arrowX - 10 : arrowX}px`
        : '',
      [staticSide === 'bottom' ? 'top' : staticSide]: sideValue[staticSide],
      transform: `rotate(${arrowDeg[finalPlacement]}deg)`,
    });
  });
}
