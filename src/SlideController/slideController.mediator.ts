import { createState } from '@pastweb/tools';
import { INITIAL_STATE } from './constants';
import {
  onClosePortal as _onClosePortal,
  onMounted as _onMounted,
  closeSlide as _closeSlide,
  getParentSlide as _getParentSlide,
  onBackdropClick,
  onKeyDown,
} from './util';
import type { SlideControllerDefaultProps, SlideControllerState, SlideControllerMediator, CloseOptions } from './types';

export function slideController(props: SlideControllerDefaultProps): SlideControllerMediator {
  const { state, setState } = createState<SlideControllerState>(INITIAL_STATE);

  let confirmClose: (() => void) | null = null;
  const onClosePortal = _onClosePortal(props, closeSlide);

  function closeSlide(closeOptions?: CloseOptions) {
    _closeSlide({
      props,
      onClosePortal,
      confirmClose,
      setState,
      closeOptions,
    });
  }

  function onMounted(slideElement: HTMLElement) {
    _onMounted({
      props,
      slideElement,
      onClosePortal,
    });
  }

  function getParentSlide(inject?: Record<string, any>) {
    return _getParentSlide({
      props,
      setConfirm: fn => confirmClose = fn,
      closeSlide,
      inject,
    });
  }

  return {
    state,
    onMounted,
    getParentSlide,
    onBackdropClick: () => onBackdropClick(props, closeSlide),
    onKeyDown: e => onKeyDown(props, e, closeSlide),
  };
}
