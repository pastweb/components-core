import { reactive } from '@pastweb/tools';
import {
  closeSheet as _closeSheet,
  getContext as _getContext,
  onClosePortal as _onClosePortal,
  onMounted as _onMounted,
  onBackdropClick,
  onKeyDown,
} from './util';
import type {
  CloseOptions,
  SheetControllerDefaultProps,
  SheetControllerMediator,
  SheetControllerState,
} from './types';

export function sheetControllerMediator(props: SheetControllerDefaultProps): SheetControllerMediator {
  const state = reactive<SheetControllerState>({ isOpen: true });

  let confirmClose: (() => void) | null = null;
  const onClosePortal = _onClosePortal(props, closeSheet);

  function closeSheet(closeOptions?: CloseOptions) {
    _closeSheet({
      props,
      onClosePortal,
      confirmClose,
      state,
      closeOptions,
    });
  }

  function onMounted(SheetElement: HTMLElement) {
    _onMounted({
      props,
      SheetElement,
      onClosePortal,
    });
  }

  function getContext() {
    return _getContext({
      props,
      setConfirm: fn => confirmClose = fn,
      closeSheet,
    });
  }

  return {
    state,
    onMounted,
    getContext,
    onBackdropClick: () => onBackdropClick(props, closeSheet),
    onKeyDown: e => onKeyDown(props, e, closeSheet),
  };
}
