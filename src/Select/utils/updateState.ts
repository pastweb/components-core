import type { SelectDefaultProps, SelectState } from '../types';
import { getAriaLabel } from './getAriaLabel';
import { getId } from './getId';
import { getIsDisabled } from './getIsDisabled';
import { getIsLoading } from './getIsLoading';
import { getIsUnavailable } from './getIsUnavailable';
import { getLabelId } from './getLabelId';
import { getListboxId } from './getListboxId';
import { getTriggerId } from './getTriggerId';

/**
 * Synchronizes Select IDs and accessibility state from the current props.
 *
 * @example
 * ```ts
 * updateState(props, state, uid);
 * ```
 */
export function updateState(
  props: SelectDefaultProps,
  state: SelectState,
  uid: string,
): void {
  const id = getId(props, uid);
  state.inputId = id;
  state.labelId = getLabelId(id);
  state.listboxId = getListboxId(id);
  state.triggerId = getTriggerId(id);
  state.ariaLabel = getAriaLabel(props);
  state.isDisabled = getIsDisabled(props);
  state.isLoading = getIsLoading(props);
  state.isUnavailable = getIsUnavailable(props);
}
