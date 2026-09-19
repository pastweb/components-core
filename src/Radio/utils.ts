import { idCache } from '../utils';
import type { RadioDefaultProps, RadioState } from './types';

/**
 * Resolves the Radio group ID from an explicit or generated value.
 *
 * Explicit IDs are stored as `_${id}`. Generated IDs use the `radio` prefix.
 *
 * @example
 * ```ts
 * getGroupId(props, uid);
 * ```
 */
export function getGroupId(
  props: RadioDefaultProps,
  uid: string,
): string {
  return props.id ? `_${props.id}` : uid;
}

/**
 * Resolves the group-label relationship ID when visible label text is present.
 *
 * @example
 * ```ts
 * getGroupLabelId(props, groupId);
 * ```
 */
export function getGroupLabelId(
  props: RadioDefaultProps,
  groupId: string,
): string | undefined {
  return props.label ? `label${groupId}` : undefined;
}

/**
 * Resolves an option ID from an explicit value or the group ID and index.
 *
 * @example
 * ```ts
 * getOptionId(groupId, 1);
 * ```
 */
export function getOptionId(
  groupId: string,
  index: number,
  id?: string,
): string {
  return id ?? `option${groupId}${index}`;
}

/**
 * Normalizes the Radio group accessible name.
 *
 * Visible `label` text names the group, so `ariaLabel` is omitted then. An
 * explicit empty `ariaLabel` also omits the accessible name.
 *
 * @example
 * ```ts
 * getAriaLabel(props, groupLabelId);
 * ```
 */
export function getAriaLabel(
  props: RadioDefaultProps,
  groupLabelId: string | undefined,
): string | undefined {
  if (groupLabelId) return undefined;
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the Radio group disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: RadioDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}

/**
 * Synchronizes Radio identity and accessibility state from the current props.
 *
 * @example
 * ```ts
 * updateState(props, state, uid);
 * ```
 */
export function updateState(
  props: RadioDefaultProps,
  state: RadioState,
  uid: string,
): void {
  const groupId = getGroupId(props, uid);
  const groupLabelId = getGroupLabelId(props, groupId);

  state.groupId = groupId;
  state.groupLabelId = groupLabelId;
  state.ariaLabel = getAriaLabel(props, groupLabelId);
  state.isDisabled = getIsDisabled(props);
}

/**
 * Synchronizes the selected Radio value from props.
 *
 * @example
 * ```ts
 * updateValue(props, state);
 * ```
 */
export function updateValue(
  props: RadioDefaultProps,
  state: RadioState,
): void {
  const value = props.value || '';
  if (value !== state.value) state.value = value;
}

/**
 * Reports an available Radio selection.
 *
 * @example
 * ```ts
 * onChange(props, state, 'email', event);
 * ```
 */
export function onChange(
  props: RadioDefaultProps,
  state: RadioState,
  value: string = '',
  e: any,
): void {
  if (getIsDisabled(props)) return;

  state.value = value;
  props.onChange(value, e);
}

/**
 * Releases the generated Radio group ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
