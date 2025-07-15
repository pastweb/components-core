import type { SlideControllerDefaultProps } from '../../types';

export function onKeyDown(props: SlideControllerDefaultProps, e: any, closeSlide: () => void) {
  if (e.key === 'Escape') {
    closeSlide();
    props.onKeyDown(e);
  }
}
