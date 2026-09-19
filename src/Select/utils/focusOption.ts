import type { SelectMediatorVars, SelectState } from '../types';
import { optionCount } from './optionCount';

/**
 * Moves highlight and focus to a clamped option index.
 *
 * @example
 * ```ts
 * focusOption(state, vars, 0);
 * ```
 */
export function focusOption(
  state: SelectState,
  vars: SelectMediatorVars,
  index: number,
): void {
  const count = optionCount(vars);
  if (count === 0) return;
  const nextIndex = Math.min(Math.max(index, 0), count - 1);
  state.highlightIndex = nextIndex;
  const option = vars.listboxReference?.children?.[nextIndex] as HTMLElement | undefined;
  option?.focus?.();
}
