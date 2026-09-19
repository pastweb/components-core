import { computePosition, flip, offset, shift, size } from '@floating-ui/dom';
import type { SelectDefaultProps, SelectMediatorVars } from '../types';

/**
 * Positions the listbox relative to the trigger with Floating UI.
 *
 * Coordinates use the `fixed` strategy so they are viewport-relative. Placement
 * is `bottom` so the content-sized list stays centered on the trigger. Flip is
 * limited to `top` so a clipping ancestor such as ScrollArea cannot send the
 * list to the side. Overflow is checked against the viewport because `fixed`
 * is not clipped by ordinary overflow containers. A hidden list is measured
 * off-screen so positioning does not wait on a later render. Transform and
 * inset are cleared before measuring so CSS fallback alignment cannot skew
 * Floating UI coordinates.
 *
 * @example
 * ```ts
 * updatePosition(props, vars);
 * ```
 */
export function updatePosition(
  props: SelectDefaultProps,
  vars: SelectMediatorVars,
): void {
  const trigger = vars.triggerReference;
  const listbox = vars.listboxReference;
  if (!trigger || !listbox || !listbox.isConnected) return;

  const restoreHidden = listbox.hidden;
  if (restoreHidden) {
    listbox.hidden = false;
    listbox.style.visibility = 'hidden';
  }

  Object.assign(listbox.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    right: 'auto',
    bottom: 'auto',
    margin: '0',
    transform: 'none',
  });

  const overflow = {
    boundary: document.documentElement,
    padding: 8,
    rootBoundary: 'viewport' as const,
  };

  computePosition(trigger, listbox, {
    strategy: 'fixed',
    placement: 'bottom',
    middleware: [
      offset(props.offset),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `min(${Math.max(availableHeight, 0)}px, var(--pw_Select_options_default_max-height))`,
          });
        },
      }),
      flip({
        ...overflow,
        fallbackPlacements: ['top'],
        flipAlignment: false,
        crossAxis: false,
      }),
      shift(overflow),
    ],
  }).then(({ x, y }) => {
    if (!listbox.isConnected) return;
    Object.assign(listbox.style, {
      left: `${x}px`,
      top: `${y}px`,
      visibility: '',
    });
  }).catch(() => {
    if (!listbox.isConnected) return;
    listbox.style.visibility = '';
    if (restoreHidden) listbox.hidden = true;
  });
}
