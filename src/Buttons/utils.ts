import { idCache } from '../utils';
import type {
  ButtonsContext,
  ButtonsDefaultProps,
  ButtonsState,
} from './types';

/**
 * Normalizes the optional Buttons accessible label.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: ButtonsDefaultProps,
): string | undefined {
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the Buttons disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: ButtonsDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}

/**
 * Normalizes the optional Buttons group role.
 *
 * @example
 * ```ts
 * getRole(props);
 * ```
 */
export function getRole(
  props: ButtonsDefaultProps,
): 'group' | undefined {
  return getAriaLabel(props) ? 'group' : undefined;
}

/**
 * Creates the live context exposed by a Buttons mediator.
 *
 * @example
 * ```ts
 * getContext(state);
 * ```
 */
export function getContext(state: ButtonsState): ButtonsContext {
  return {
    get disabled() {
      return state.isDisabled;
    },
  };
}

/**
 * Releases the generated Buttons ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
