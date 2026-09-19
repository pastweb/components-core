import type { SelectDefaultProps, SelectKeyEvent, SelectMediatorVars, SelectState } from '../types';
import { onChange } from './onChange';
import { onKeyDown } from './onKeyDown';

/**
 * Handles option keyboard activation, then forwards remaining keys.
 *
 * @example
 * ```ts
 * onOptionKeyDown(props, state, vars, event, 'uk');
 * ```
 */
export function onOptionKeyDown(
  props: SelectDefaultProps,
  state: SelectState,
  vars: SelectMediatorVars,
  event: SelectKeyEvent,
  value: any,
  disabled = false,
): void {
  if (disabled) return;
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault?.();
    onChange(props, state, vars, value);
    return;
  }
  onKeyDown(props, state, vars, event);
}
