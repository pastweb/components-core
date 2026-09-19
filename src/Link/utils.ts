import type {
  LinkClickEvent,
  LinkDefaultProps,
  LinkState,
} from './types';

/**
 * Normalizes the Link disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: LinkDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}

/**
 * Forwards an available Link activation and prevents navigation when disabled.
 *
 * @example
 * ```ts
 * onClick(props, state, event);
 * ```
 */
export function onClick(
  props: LinkDefaultProps,
  state: LinkState,
  event: LinkClickEvent,
): void {
  if (state.isDisabled) {
    event.preventDefault?.();
    return;
  }

  props.onClick(event);
}
