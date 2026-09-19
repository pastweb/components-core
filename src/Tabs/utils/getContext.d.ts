import type {
  TabsContext,
  TabsDefaultProps,
  TabsMediatorVars,
  TabsState,
} from '../types';
/**
 * Creates the live context exposed by a Tabs mediator.
 *
 * @example
 * ```ts
 * getContext(props, state, vars, uid);
 * ```
 */
export declare function getContext(
  props: TabsDefaultProps,
  state: TabsState,
  vars: TabsMediatorVars,
  uid: string,
): TabsContext;
