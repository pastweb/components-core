import { reactive } from '@pastweb/tools';
import {
  bringToFront as _bringToFront,
  closeWindow as _closeWindow,
  getContext as _getContext,
  onClosePortal as _onClosePortal,
  onMounted as _onMounted,
  onBackdropClick,
  onKeyDown,
} from './util';
import type {
  CloseOptions,
  WindowControllerDefaultProps,
  WindowControllerMediator,
  WindowControllerState,
} from './types';

export function windowControllerMediator(props: WindowControllerDefaultProps): WindowControllerMediator {
  const state = reactive<WindowControllerState>({ isOpen: true });

  let confirmClose: (() => void) | null = null;
  let mountElement: HTMLElement | null = null;

  function closeWindow(closeOptions?: CloseOptions) {
    _closeWindow({
      props,
      onClosePortal,
      confirmClose,
      state,
      closeOptions,
    });
  }

  const onClosePortal = _onClosePortal(props, closeWindow);
  const bringToFront = () => _bringToFront(props, mountElement as HTMLElement);

  function onMounted(windowElement: HTMLElement) {
    _onMounted({
      props,
      windowElement,
      onClosePortal,
      bringToFront,
      setMountElement: element => mountElement = element,
    });
  }

  function getContext() {
    return _getContext({
      props,
      closeWindow,
      setConfirm: fn => confirmClose = fn,
      bringToFront,
    });
  }

  return {
    state,
    getContext,
    onMounted,
    onBackdropClick: () => onBackdropClick(props, closeWindow),
    onKeyDown: (e) => onKeyDown(props, e, closeWindow),
  };
}
