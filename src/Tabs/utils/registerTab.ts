import type { TabDefaultProps } from '../Tab/types';
import type { TabsMediatorVars } from '../types';

/**
 * Stores Tab props in registration order and returns the Tab index.
 *
 * The props object identity is the registration key, so later calls with the
 * same object update the existing entry.
 *
 * @example
 * ```ts
 * const index = registerTab(vars, props);
 * ```
 */
export function registerTab(
  vars: TabsMediatorVars,
  props: TabDefaultProps,
): number {
  const index = vars.tabs.indexOf(props);

  if (index !== -1) return index;

  vars.tabs.push(props);
  return vars.tabs.length - 1;
}
