import type { ParentSlide, SlideControllerDefaultProps } from '../../types';

export function getParentSlide(params: {
  props: SlideControllerDefaultProps;
  setConfirm: (fn: () => void) => void,
  closeSlide: () => void;
  inject?: Record<string, any>;
}): ParentSlide {
  const { props, closeSlide, setConfirm, inject = {} } = params;

  const {
    portal,
    entryId,

    backdrop,
    direction,
    height,
    width,
    top,
    bottom,
    left,
    right,
    animationTime,
    closeOnBackdropClick,
  } = props;

  return {
    id: entryId,
    props: {
      backdrop,
      direction,
      height,
      width,
      top,
      bottom,
      left,
      right,
      animationTime,
      closeOnBackdropClick,
    },
    close: closeSlide,
    setConfirm,
    update: props => portal.update(entryId, props),
    inject,
  };
}
