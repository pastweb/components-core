import type {
  WalktourDefaultProps,
  WalktourMediatorVars,
  WalktourRect,
  WalktourState,
  WalktourViewport,
} from '../types';
import { clampIndex } from './clampIndex';
import { getCardPosition } from './getCardPosition';
import { getHole } from './getHole';
import { getTarget } from './getTarget';
import { getTargetRect } from './getTargetRect';
import { getViewport } from './getViewport';

/** Synchronizes renderer-ready state with the current step and props. */
export function updateState(
  props: WalktourDefaultProps,
  state: WalktourState,
  vars: WalktourMediatorVars,
): void {
  const step = props.steps[state.stepIndex];
  const maskPadding = step?.maskPadding ?? props.maskPadding;
  const offset = step?.offset ?? props.offset;
  const placement = step?.placement ?? props.placement;

  state.step = step;
  state.maskPadding = maskPadding;
  state.maskRadius = step?.maskRadius ?? props.maskRadius;
  state.isMaskVisible = !props.disableMask;
  state.isTargetInteractionDisabled = props.disableMaskInteraction;
  state.canClose = Boolean(step) && !step.disableClose;
  state.canPrevious = Boolean(step) && state.stepIndex > 0 && !step.disablePrevious;
  state.canNext = Boolean(step) && !step.disableNext;
  state.closeLabel = step?.closeLabel ?? props.closeLabel;
  state.previousLabel = step?.previousLabel ?? props.previousLabel;
  state.nextLabel = state.stepIndex === props.steps.length - 1 ? 'Finish' : step?.nextLabel ?? props.nextLabel;
  state.hole = getHole(state.targetRect, vars.viewport, maskPadding);
  state.cardPosition = getCardPosition(state.targetRect, placement, offset);
}

/** Changes the active step and reports the resulting step. */
export function setStep(
  props: WalktourDefaultProps,
  state: WalktourState,
  vars: WalktourMediatorVars,
  index: number,
): void {
  state.stepIndex = clampIndex(index, props.steps.length);
  state.targetRect = null;
  updateState(props, state, vars);
  const step = props.steps[state.stepIndex];
  if (step) props.onStepChange?.(state.stepIndex, step);
}

/** Closes the tour, preserving controlled-state ownership. */
export function close(props: WalktourDefaultProps, state: WalktourState): void {
  if (props.open === undefined) state.isOpen = false;
  props.onOpenChange?.(false);
  props.onClose?.();
}

/** Opens the tour at the requested step. */
export function open(
  props: WalktourDefaultProps,
  state: WalktourState,
  vars: WalktourMediatorVars,
  index = props.initialStepIndex,
): void {
  if (props.open === undefined) state.isOpen = true;
  props.onOpenChange?.(true);
  setStep(props, state, vars, index);
}

/** Advances the tour or completes it on its final step. */
export function next(
  props: WalktourDefaultProps,
  state: WalktourState,
  vars: WalktourMediatorVars,
): void {
  if (!state.canNext) return;
  if (state.stepIndex === props.steps.length - 1) {
    props.onComplete?.();
    close(props, state);
    return;
  }
  setStep(props, state, vars, state.stepIndex + 1);
}

/** Moves to the preceding step when available. */
export function previous(
  props: WalktourDefaultProps,
  state: WalktourState,
  vars: WalktourMediatorVars,
): void {
  if (state.canPrevious) setStep(props, state, vars, state.stepIndex - 1);
}

/** Stores the current target geometry and viewport dimensions. */
export function setTarget(
  props: WalktourDefaultProps,
  state: WalktourState,
  vars: WalktourMediatorVars,
  rect: WalktourRect | null,
  viewport: WalktourViewport,
): void {
  vars.viewport = viewport;
  state.targetRect = rect;
  updateState(props, state, vars);
}

/** Handles Escape close requests. */
export function onKeyDown(
  props: WalktourDefaultProps,
  state: WalktourState,
  key: string,
): void {
  if (key === 'Escape' && props.closeOnEscape && state.canClose) close(props, state);
}

/** Handles a click on the backdrop. */
export function onMaskClick(props: WalktourDefaultProps, state: WalktourState): void {
  if (props.closeOnMaskClick && state.canClose) close(props, state);
}

/** Handles a click on a step target. */
export function onTargetClick(
  props: WalktourDefaultProps,
  state: WalktourState,
  vars: WalktourMediatorVars,
): void {
  if (state.step?.nextOnTargetClick) next(props, state, vars);
}

/** Removes the click handler from the prior target. */
export function detachTarget(vars: WalktourMediatorVars, onTargetClickListener: () => void): void {
  vars.target?.removeEventListener('click', onTargetClickListener);
  vars.target = null;
}

/** Resolves, measures, and optionally scrolls the active target. */
export function updateTarget(
  props: WalktourDefaultProps,
  state: WalktourState,
  vars: WalktourMediatorVars,
  onTargetClickListener: () => void,
  shouldScroll = false,
): void {
  const nextTarget = state.isOpen && state.step ? getTarget(state.step.ref) : null;
  if (vars.target !== nextTarget) {
    detachTarget(vars, onTargetClickListener);
    vars.target = nextTarget;
    vars.target?.addEventListener('click', onTargetClickListener);
  }

  setTarget(props, state, vars, vars.target ? getTargetRect(vars.target) : null, getViewport());
  if (vars.target && shouldScroll && props.scrollIntoView) {
    vars.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }
}

/** Registers the global listeners used while a Walktour is mounted. */
export function useMounted(
  props: WalktourDefaultProps,
  state: WalktourState,
  vars: WalktourMediatorVars,
  onKeyDownListener: (event: KeyboardEvent) => void,
  onViewportChange: () => void,
  onTargetClickListener: () => void,
): void {
  if (vars.isMounted || typeof window === 'undefined') return;
  vars.isMounted = true;
  window.addEventListener('keydown', onKeyDownListener);
  window.addEventListener('resize', onViewportChange);
  window.addEventListener('scroll', onViewportChange, true);
  updateTarget(props, state, vars, onTargetClickListener, true);
}

/** Releases global listeners and the active target listener. */
export function useBeforeUnmount(
  vars: WalktourMediatorVars,
  onKeyDownListener: (event: KeyboardEvent) => void,
  onViewportChange: () => void,
  onTargetClickListener: () => void,
): void {
  if (!vars.isMounted || typeof window === 'undefined') return;
  vars.isMounted = false;
  detachTarget(vars, onTargetClickListener);
  window.removeEventListener('keydown', onKeyDownListener);
  window.removeEventListener('resize', onViewportChange);
  window.removeEventListener('scroll', onViewportChange, true);
}
