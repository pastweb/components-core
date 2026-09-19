import type { VirtualElement } from '@floating-ui/dom';
import type { DropDownDefaultProps, DropDownMediatorVars } from '../types';

/**
 * Builds the Floating UI reference used to position DropDown content.
 *
 * When `visibleTarget` is `pointer` and a pointer position was captured from
 * the trigger, the reference is a point at that pointer. Otherwise the trigger
 * element is used.
 *
 * @example
 * ```ts
 * const reference = getVirtualReference(props, vars);
 * ```
 */
export function getVirtualReference(
  props: DropDownDefaultProps,
  vars: DropDownMediatorVars,
): VirtualElement | undefined {
  const target = vars.targetReference;
  if (!target) return undefined;

  const scrollX = props.position === 'fixed' ? 0 : window.scrollX;
  const scrollY = props.position === 'fixed' ? 0 : window.scrollY;
  const pointer = props.visibleTarget === 'pointer' ? vars.pointerPosition : undefined;
  if (pointer) {
    const left = pointer.x + scrollX;
    const top = pointer.y + scrollY;

    return {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          top,
          right: left,
          bottom: top,
          left,
          x: left,
          y: top,
        };
      },
    };
  }

  const rect = target.getBoundingClientRect();
  return {
    getBoundingClientRect() {
      return {
        width: rect.width,
        height: rect.height,
        top: rect.top + scrollY,
        right: rect.right + scrollX,
        bottom: rect.bottom + scrollY,
        left: rect.left + scrollX,
        x: rect.left + scrollX,
        y: rect.top + scrollY,
      };
    },
  };
}
