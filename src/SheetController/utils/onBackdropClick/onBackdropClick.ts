import type { SheetControllerDefaultProps } from '../../types';

/**
 * Closes the sheet from the backdrop when backdrop closing is enabled.
 *
 * @example
 * ```ts
 * onBackdropClick(props, closeSheet);
 * ```
 */
export function onBackdropClick(props: SheetControllerDefaultProps, closeSheet: () => void): void {
  if (props.backdrop && props.closeOnBackdropClick) closeSheet();
}
