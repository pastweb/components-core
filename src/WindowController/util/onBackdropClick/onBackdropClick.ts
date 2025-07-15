import type { WindowControllerDefaultProps } from '../../types';

export function onBackdropClick(props: WindowControllerDefaultProps, closeWindow: () => void): void {
  const { closeOnBackdropClick } = props;

  if (closeOnBackdropClick) {
    closeWindow();
  }
}
