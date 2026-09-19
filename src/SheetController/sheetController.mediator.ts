import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  closeSheet as _closeSheet,
  getContext as _getContext,
  onBackdropClick,
  onClosePortal as _onClosePortal,
  onKeyDown as _onKeyDown,
  onMounted as _onMounted,
  onTransitionEnd as _onTransitionEnd,
  restoreFocus,
  useBeforeUnmount as _useBeforeUnmount,
} from './utils';
import type {
  CloseOptions,
  SheetControllerDefaultProps,
  SheetControllerMediator,
  SheetControllerState,
  SheetControllerVars,
  SheetEvent,
} from './types';

export function sheetControllerMediator(props: SheetControllerDefaultProps): SheetControllerMediator {
  const uid = idCache.getId('sheetController');
  const getId = () => props.id ? `_${props.id}` : uid;
  const vars: SheetControllerVars = {
    confirmClose: null,
    finalized: false,
  };

  const state = reactive<SheetControllerState>({
    ariaLabel: props.ariaLabel || undefined,
    id: getId(),
    isClosed: false,
    isClosing: false,
    isOpen: true,
  });

  function onClose(closeOptions?: CloseOptions) {
    _closeSheet({ props, state, vars, closeOptions });
  }

  function onPortalClose(event: SheetEvent) {
    _onClosePortal(props, onClose)(event);
  }

  effect(
    () => {
      state.ariaLabel = props.ariaLabel || undefined;
      state.id = getId();
    },
    () => [props.ariaLabel, props.id],
  );

  effect(
    () => {
      if (state.isClosing) restoreFocus(vars);
    },
    () => state.isClosing,
  );

  return {
    get id() { return state.id; },
    state,
    getContext: () => _getContext({
      props,
      id: state.id,
      closeSheet: onClose,
      setConfirm: fn => { vars.confirmClose = fn; },
    }),
    onBackdrop: () => onBackdropClick(props, onClose),
    onClose,
    onKeyDown: event => _onKeyDown(props, event, onClose, vars),
    onTransitionEnd: () => _onTransitionEnd({ props, state, vars }),
    useBeforeUnmount: () => _useBeforeUnmount({ vars, onPortalClose, uid }),
    useMounted: (sheet, host) => _onMounted({ props, sheet, host, vars, onPortalClose }),
  };
}
