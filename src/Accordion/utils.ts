import { idCache } from '../utils';
import type {
  AccordionContext,
  AccordionDefaultProps,
  AccordionState,
} from './types';

/**
 * Normalizes the optional Accordion accessible label.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: AccordionDefaultProps,
): string | undefined {
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the Accordion disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: AccordionDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}

/**
 * Normalizes the optional Accordion group role.
 *
 * @example
 * ```ts
 * getRole(props);
 * ```
 */
export function getRole(
  props: AccordionDefaultProps,
): 'group' | undefined {
  return getAriaLabel(props) ? 'group' : undefined;
}

/**
 * Creates the live context exposed by an Accordion mediator.
 *
 * @example
 * ```ts
 * getContext(props, state);
 * ```
 */
export function getContext(
  props: AccordionDefaultProps,
  state: AccordionState,
): AccordionContext {
  return {
    get className() {
      return props.className;
    },
    get disabled() {
      return state.isDisabled;
    },
    get rtl() {
      return props.rtl;
    },
    get transitionDuration() {
      return props.transitionDuration;
    },
  };
}

/**
 * Releases the generated Accordion ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
