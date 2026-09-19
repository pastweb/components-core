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
export declare function registerTab(
  vars: TabsMediatorVars,
  props: TabDefaultProps,
): number;
