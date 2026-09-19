import { effect, reactive } from '@pastweb/tools';
import type { WalktourDefaultProps, WalktourMediator, WalktourMediatorVars, WalktourState } from './types';
import {
  clampIndex,
  close,
  next,
  onKeyDown,
  onMaskClick,
  onTargetClick,
  open,
  previous,
  setTarget,
  updateState,
  updateTarget,
  useBeforeUnmount,
  useMounted,
} from './utils';

/** Composes Walktour reactive state with stateless interaction helpers. */
export function walktourMediator(props: WalktourDefaultProps): WalktourMediator {
  const vars: WalktourMediatorVars = {
    viewport: null,
    isMounted: false,
    target: null,
  };
  const state = reactive<WalktourState>({
    isOpen: props.open ?? false,
    stepIndex: clampIndex(props.initialStepIndex, props.steps.length),
    targetRect: null,
    step: undefined,
    hole: null,
    cardPosition: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    maskPadding: props.maskPadding,
    maskRadius: props.maskRadius,
    isMaskVisible: !props.disableMask,
    isTargetInteractionDisabled: props.disableMaskInteraction,
    canClose: false,
    canNext: false,
    canPrevious: false,
    closeLabel: props.closeLabel,
    nextLabel: props.nextLabel,
    previousLabel: props.previousLabel,
  });
  const targetClickListener = () => onTargetClick(props, state, vars);
  const viewportChangeListener = () => updateTarget(props, state, vars, targetClickListener);
  const keyDownListener = (event: KeyboardEvent) => onKeyDown(props, state, event.key);

  updateState(props, state, vars);

  effect(
    () => {
      if (props.open !== undefined) state.isOpen = props.open;
      state.stepIndex = clampIndex(state.stepIndex, props.steps.length);
      updateState(props, state, vars);
    },
    () => [props.open, props.steps, props.initialStepIndex, state.stepIndex],
  );

  effect(
    () => {
      if (vars.isMounted) updateTarget(props, state, vars, targetClickListener, true);
    },
    () => [props.scrollIntoView, props.steps, state.isOpen, state.stepIndex],
  );

  return {
    state,
    close: () => close(props, state),
    next: () => next(props, state, vars),
    previous: () => previous(props, state, vars),
    open: index => open(props, state, vars, index),
    onKeyDown: key => onKeyDown(props, state, key),
    onMaskClick: () => onMaskClick(props, state),
    onTargetClick: targetClickListener,
    setTarget: (rect, viewport) => setTarget(props, state, vars, rect, viewport),
    useMounted: () => useMounted(props, state, vars, keyDownListener, viewportChangeListener, targetClickListener),
    useBeforeUnmount: () => useBeforeUnmount(vars, keyDownListener, viewportChangeListener, targetClickListener),
  };
}
