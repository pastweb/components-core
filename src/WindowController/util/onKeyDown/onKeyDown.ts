import type { WindowControllerDefaultProps } from '../../types';

export function onKeyDown(props: WindowControllerDefaultProps, e: any, closeWindow: () => void) {
  if (e.key === 'Escape') {
    closeWindow();
    props.onKeyDown(e);
  }
}
