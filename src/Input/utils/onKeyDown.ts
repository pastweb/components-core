import type {
  InputDefaultProps,
  InputKeyEvent,
  InputState,
} from '../types';

/**
 * Forwards keyboard input from an available Input.
 *
 * Native number inputs already step on Arrow Up and Arrow Down, so those keys
 * are not duplicated here.
 *
 * @example
 * ```ts
 * onKeyDown(props, state, event);
 * ```
 */
export function onKeyDown(
  props: InputDefaultProps,
  state: InputState,
  event: InputKeyEvent,
): void {
  if (state.isDisabled || state.isLoading) return;
  props.onKeyDown(event);
}
