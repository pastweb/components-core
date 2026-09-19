import type { TabsDefaultProps, TabsMediatorVars, TabsState } from '../types';
/**
 * Selects an enabled Tab and notifies the consumer.
 *
 * @example
 * ```ts
 * setActiveTab(props, state, vars, 1);
 * ```
 */
export declare function setActiveTab(props: TabsDefaultProps, state: TabsState, vars: TabsMediatorVars, index: number): void;
