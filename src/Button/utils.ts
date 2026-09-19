import type { ButtonsContext } from '../Buttons';
import { idCache } from '../utils';
import type {
  ButtonDefaultProps,
  ButtonState,
} from './types';

/**
 * Normalizes local and inherited Button disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props, context);
 * ```
 */
export function getIsDisabled(
  props: ButtonDefaultProps,
  context: ButtonsContext | undefined,
): true | undefined {
  return props.disabled || context?.disabled || undefined;
}

/**
 * Normalizes Button loading state from props and compatibility classes.
 *
 * @example
 * ```ts
 * getIsLoading(props);
 * ```
 */
export function getIsLoading(
  props: ButtonDefaultProps,
): boolean {
  return props.loading || props.className.split(/\s+/).includes('is-loading');
}

/**
 * Forwards an available Button activation.
 *
 * @example
 * ```ts
 * onClick(props, state, event);
 * ```
 */
export function onClick(
  props: ButtonDefaultProps,
  state: ButtonState,
  event: unknown,
): void {
  if (state.isDisabled || state.isLoading) return;
  props.onClick(event);
}

/**
 * Releases the generated Button ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
