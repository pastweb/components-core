import { createState } from '@pastweb/tools';
import { INITIAL_STATE } from './constants';
import {
  bringToFront as _bringToFront,
  closeWindow as _closeWindow,
  onClosePortal as _onClosePortal,
  onMounted as _onMounted,
  onKeyDown,
  getParentWindow as _getParentWindow,
  onBackdropClick,
} from './util';
import type {
  WindowControllerDefaultProps,
  WindowControllerMediator,
  WindowControllerState,
  CloseOptions,
} from './types';

export function windowController(props: WindowControllerDefaultProps): WindowControllerMediator {
  const { state, setState } = createState<WindowControllerState>(INITIAL_STATE);

  let confirmClose: (() => void) | null = null;
  let mountElement: HTMLElement | null = null;

  function closeWindow(closeOptions?: CloseOptions) {
    _closeWindow({
      props,
      onClosePortal,
      confirmClose,
      setState,
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
      setState,
      bringToFront,
      setMountElement: element => mountElement = element,
    });
  }

  function getParentWindow(inject: Record<string, any> = {}) {
    return _getParentWindow({
      props,
      closeWindow,
      setConfirm: fn => confirmClose = fn,
      bringToFront,
      inject,
    });
  }

  return {
    state,
    getParentWindow,
    onMounted,
    onBackdropClick: () => onBackdropClick(props, closeWindow),
    onKeyDown: (e) => onKeyDown(props, e, closeWindow),
  };
}
