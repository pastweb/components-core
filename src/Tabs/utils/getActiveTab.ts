import type { TabsDefaultProps } from '../types';

/**
 * Normalizes the active Tabs index.
 *
 * @example
 * ```ts
 * getActiveTab(props);
 * ```
 */
export function getActiveTab(props: TabsDefaultProps): number {
  return Math.max(0, props.activeTab);
}
