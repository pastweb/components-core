import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownState,
} from '../types';

/**
 * Sets DropDown visibility and reports it when the value actually changes.
 *
 * @example
 * ```ts
 * setVisible(props, state, false);
 * ```
 */
export function setVisible(
  props: DropDownDefaultProps,
  state: DropDownState,
  isVisible: boolean,
  vars?: DropDownMediatorVars,
): void {
  if (state.isVisible === isVisible) return;

  if (!isVisible && typeof document !== 'undefined') {
    const activeElement = document.activeElement;
    const isFocusInsideContent = !!(
      vars?.containerReference
      && activeElement
      && vars.containerReference.contains(activeElement)
    );

    if (isFocusInsideContent) vars?.targetReference?.focus();
  }

  state.isVisible = isVisible;
  props.onChange(isVisible);
}
