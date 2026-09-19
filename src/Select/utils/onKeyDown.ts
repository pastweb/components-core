import type { SelectDefaultProps, SelectKeyEvent, SelectMediatorVars, SelectState } from '../types';
import { focusOption } from './focusOption';
import { getIsUnavailable } from './getIsUnavailable';
import { onClose } from './onClose';
import { onOpen } from './onOpen';
import { onToggle } from './onToggle';
import { optionCount } from './optionCount';

/**
 * Handles trigger keyboard interaction for an available Select.
 *
 * @example
 * ```ts
 * onKeyDown(props, state, vars, event);
 * ```
 */
export function onKeyDown(
  props: SelectDefaultProps,
  state: SelectState,
  vars: SelectMediatorVars,
  event: SelectKeyEvent,
): void {
  if (getIsUnavailable(props)) return;

  switch (event.key) {
    case 'Escape':
      if (state.isOpen) {
        event.preventDefault?.();
        onClose(state, vars, true);
      }
      break;
    case 'Enter':
    case ' ':
      event.preventDefault?.();
      onToggle(props, state, vars);
      break;
    case 'ArrowUp':
      event.preventDefault?.();
      if (!state.isOpen) onOpen(props, state, vars, 'last');
      else focusOption(state, vars, (state.highlightIndex ?? optionCount(vars)) - 1);
      break;
    case 'ArrowDown':
      event.preventDefault?.();
      if (!state.isOpen) onOpen(props, state, vars, 'first');
      else focusOption(state, vars, (state.highlightIndex ?? -1) + 1);
      break;
    case 'Home':
      if (state.isOpen) {
        event.preventDefault?.();
        focusOption(state, vars, 0);
      }
      break;
    case 'End':
      if (state.isOpen) {
        event.preventDefault?.();
        focusOption(state, vars, optionCount(vars) - 1);
      }
      break;
    case 'Tab':
      if (state.isOpen) onClose(state, vars);
      break;
  }
}
