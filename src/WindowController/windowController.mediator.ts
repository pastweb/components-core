import { effect, reactive } from '@pastweb/tools';
import {
  bringToFront as _bringToFront,
  closeWindow as _closeWindow,
  getAnimationStyle,
  getContext as _getContext,
  onClosePortal as _onClosePortal,
  onMounted as _onMounted,
  onBackdropClick,
  onKeyDown,
  restoreFocus,
} from './util';
import type {
  CloseOptions,
  WindowControllerDefaultProps,
  WindowControllerMediator,
  WindowControllerState,
  WindowControllerVars,
} from './types';

export function windowControllerMediator(props: WindowControllerDefaultProps): WindowControllerMediator {
  const state = reactive<WindowControllerState>({
    isOpen: true,
    isHidden: false,
    isActive: props.manager?.state.activeId === props.entryId,
    manager: props.manager?.state.windows.find(window => window.id === props.entryId),
  });

  const vars: WindowControllerVars = {
    confirmClose: null,
    mountElement: null,
    previousFocus: null,
    windowElement: null,
    manager: state.manager,
  };

  effect(
    () => {
      const managerState = props.manager?.state;
      const managedWindow = managerState?.windows.find(window => window.id === props.entryId);
      state.isActive = managerState?.activeId === props.entryId;
      state.manager = managedWindow;
      vars.manager = managedWindow;
    },
    () => props.manager?.state,
  );

  function closeWindow(closeOptions?: CloseOptions) {
    _closeWindow({
      props,
      onClosePortal,
      vars,
      state,
      closeOptions,
    });
  }

  const onClosePortal = _onClosePortal(props, closeWindow);
  const hide = () => {
    if (props.manager) props.manager.hide(props.entryId);
    else state.isHidden = true;
  };
  const show = () => {
    if (props.manager) props.manager.show(props.entryId);
    else state.isHidden = false;
  };
  const bringToFront = (activate = true) => {
    show();
    _bringToFront(props, vars, activate);
  };
  const minimize = () => {
    show();
    return props.manager?.minimize(props.entryId) ?? false;
  };

  function maximize() {
    show();

    const managedWindow = props.manager?.state.windows.find(window => window.id === props.entryId);

    if (managedWindow?.status === 'maximized') return props.manager?.restore(props.entryId) ?? false;

    const workspace = props.portalElement.parentElement?.getBoundingClientRect();

    if (!workspace) return false;

    return props.manager?.maximize(props.entryId, {
      x: 0,
      y: 0,
      width: workspace.width,
      height: workspace.height,
    }) ?? false;
  }

  function onMounted(windowElement: HTMLElement) {
    _onMounted({
      props,
      windowElement,
      onClosePortal,
      bringToFront,
      vars,
    });

    const callbacks = { requestFocus: () => bringToFront(false) };
    if (props.manager?.setCallbacks(props.entryId, callbacks)) return;
    setTimeout(() => props.manager?.setCallbacks(props.entryId, callbacks));
  }

  function getContext() {
    return _getContext({
      props,
      closeWindow,
      setConfirm: fn => { vars.confirmClose = fn; },
      bringToFront,
      hide,
      show,
      minimize,
      maximize,
      isActive: state.isActive,
      manager: state.manager,
    });
  }

  return {
    state,
    getContext,
    onMounted,
    onBackdropClick: () => onBackdropClick(props, closeWindow),
    onKeyDown: e => onKeyDown(props, e, closeWindow, vars),
    getAnimationStyle: () => getAnimationStyle(props, state, vars),
    useBeforeUnmount: () => restoreFocus(vars),
  };
}
