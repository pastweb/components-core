import type { SlideControllerDefaultProps } from '../../types';

export function onClosePortal(props: SlideControllerDefaultProps, closeSlide: () => void) {
  const { entryId } = props;

  return (e: any) => {
    if (e.type === 'close' && (e.detail.entryId === '*' || e.detail.entryId === entryId)) {
      closeSlide();
    }
  };
}
