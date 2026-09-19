import type { ToastControllerDefaultProps } from '../../types';

/**
 * Dismisses the toast on Escape when enabled.
 *
 * @example
 * ```ts
 * onKeyDown(props, event, closeToast);
 * ```
 */
export function onKeyDown(props: ToastControllerDefaultProps, e: any, closeFunction: () => void) {
  if (e.key === 'Escape' && props.closeOnEscKey) {
    closeFunction();
  }
  props.onKeyDown(e);
}
