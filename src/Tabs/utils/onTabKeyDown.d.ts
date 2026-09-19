import type { TabsContext, TabsKeyEvent, TabsMediatorVars, TabsState } from '../types';
/**
 * Moves Tabs selection in response to an orientation-aware navigation key.
 *
 * @example
 * ```ts
 * onTabKeyDown(state, vars, setActiveTab, event, index);
 * ```
 */
export declare function onTabKeyDown(state: TabsState, vars: TabsMediatorVars, setActiveTab: TabsContext['setActiveTab'], event: TabsKeyEvent, index: number): void;
