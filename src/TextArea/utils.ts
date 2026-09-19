import { idCache } from '../utils';
import type { TextAreaDefaultProps, TextAreaState } from './types';

/**
 * Resolves the TextArea ID from an explicit value or generated id.
 *
 * @example
 * ```ts
 * getInputId(props, uid);
 * ```
 */
export function getInputId(
  props: TextAreaDefaultProps,
  uid: string,
): string {
  return props.id || uid;
}

/**
 * Normalizes the TextArea accessible name.
 *
 * Visible `label` text names the field, so `ariaLabel` is omitted then.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: TextAreaDefaultProps,
): string | undefined {
  if (props.label) return undefined;
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the TextArea disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: TextAreaDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}

/**
 * Normalizes the TextArea loading state.
 *
 * @example
 * ```ts
 * getIsLoading(props);
 * ```
 */
export function getIsLoading(
  props: TextAreaDefaultProps,
): true | undefined {
  return props.loading || props.className.includes('is-loading') || undefined;
}

/**
 * Normalizes the TextArea read-only state.
 *
 * @example
 * ```ts
 * getIsReadOnly(props);
 * ```
 */
export function getIsReadOnly(
  props: TextAreaDefaultProps,
): true | undefined {
  return props.readOnly || undefined;
}

/**
 * Normalizes the TextArea resize state.
 *
 * @example
 * ```ts
 * getIsResizeable(props);
 * ```
 */
export function getIsResizeable(
  props: TextAreaDefaultProps,
): true | undefined {
  return props.resizeable || undefined;
}

/**
 * Reports an available value change.
 *
 * @example
 * ```ts
 * onChange(props, state, 'notes');
 * ```
 */
export function onChange(
  props: TextAreaDefaultProps,
  state: TextAreaState,
  value: string,
): void {
  if (state.isDisabled || state.isLoading || state.isReadOnly) return;
  props.onChange(value);
}

/**
 * Releases the generated TextArea ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
