import type { ToastControllerDefaultProps } from '../../types';

export function onKeyDown(props: ToastControllerDefaultProps, e: any, closeFunction: () => void) {
  if (e.key === 'Escape') {
    closeFunction();
    props.onKeyDown(e);
  }
}
