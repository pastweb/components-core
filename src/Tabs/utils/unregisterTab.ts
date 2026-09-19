import type { TabDefaultProps } from '../Tab/types';
import type { TabsMediatorVars } from '../types';

/**
 * Removes a Tab registration. Remaining Tab indexes follow array order.
 *
 * @example
 * ```ts
 * unregisterTab(vars, props);
 * ```
 */
export function unregisterTab(
  vars: TabsMediatorVars,
  props: TabDefaultProps,
): void {
  const index = vars.tabs.indexOf(props);

  if (index === -1) return;

  vars.tabs.splice(index, 1);
}
