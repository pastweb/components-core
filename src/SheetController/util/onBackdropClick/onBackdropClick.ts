import type { SheetControllerDefaultProps } from '../../types';

export function onBackdropClick(props: SheetControllerDefaultProps, closePopover: () => void): void {
  const { backdrop, closeOnBackdropClick } = props;

  if (backdrop && closeOnBackdropClick) {
    closePopover();
  }
}
