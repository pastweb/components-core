import type { SlideControllerDefaultProps } from '../../types';

export function onBackdropClick(props: SlideControllerDefaultProps, closeSlide: () => void): void {
  const { backdrop, closeOnBackdropClick } = props;

  if (backdrop && closeOnBackdropClick) {
    closeSlide();
  }
}
