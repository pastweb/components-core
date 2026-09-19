import type {
  TabsContext,
  TabsKeyEvent,
} from '../types';
import type { TabDefaultProps, TabState } from './types';
import type {
  TabButtonReference,
  TabMediatorVars,
} from './types';

/**
 * Normalizes local and inherited disabled state.
 *
 * @example
 * ```ts
 * const isDisabled = getIsDisabled(props, context);
 * ```
 */
export function getIsDisabled(
  props: TabDefaultProps,
  context: TabsContext,
): true | undefined {
  return props.disabled || context.state.isDisabled || undefined;
}

/**
 * Resolves the complete Tab class name, including inherited positioning
 * helpers from Tabs.
 *
 * @example
 * ```ts
 * getClassName(props, state, context);
 * ```
 */
export function getClassName(
  props: TabDefaultProps,
  state: TabState,
  context: TabsContext,
): string {
  return props.cls(
    'Tab',
    context.state.className,
    props.className,
    state.isActive && 'is-active',
    state.isDisabled && 'is-disabled',
  );
}

/**
 * Synchronizes the renderer-ready state of a Tab.
 *
 * @example
 * ```ts
 * updateState(props, state, context);
 * ```
 */
export function updateState(
  props: TabDefaultProps,
  state: TabState,
  context: TabsContext,
): void {
  state.isDisabled = getIsDisabled(props, context);
  state.index = context.registerTab(props);
  state.ariaLabel = props.ariaLabel || undefined;
  state.controlsId = context.getContentId(state.index);
  state.id = context.getTabId(state.index);
  state.isActive = context.activeTab === state.index;
  state.className = getClassName(props, state, context);
  state.tabIndex = state.isActive ? 0 : -1;
}

/**
 * Activates an enabled Tab and notifies its consumer.
 *
 * @example
 * ```ts
 * onActivate(props, state, context);
 * ```
 */
export function onActivate(
  props: TabDefaultProps,
  state: TabState,
  context: TabsContext,
): void {
  if (state.isDisabled) return;

  context.setActiveTab(state.index);
  props.onClick();
}

/**
 * Delegates a keyboard interaction to the owning Tabs mediator.
 *
 * @example
 * ```ts
 * onKeyDown(state, context, { key: 'ArrowRight' });
 * ```
 */
export function onKeyDown(
  state: TabState,
  context: TabsContext,
  event: TabsKeyEvent,
): void {
  context.onTabKeyDown(event, state.index);
}

/**
 * Focuses the mounted button when keyboard focus is moving between tabs.
 *
 * @example
 * ```ts
 * focusButton(state, vars, context);
 * ```
 */
export function focusButton(
  state: TabState,
  vars: TabMediatorVars,
  context: TabsContext,
): void {
  if (
    !state.isActive
    || !vars.buttonReference
    || !context.consumeTabFocus(state.index)
  ) return;

  vars.buttonReference.focus();
}

/**
 * Stores the renderer focus adapter used by the Tab mediator.
 *
 * @example
 * ```ts
 * useMounted(vars, buttonReference);
 * ```
 */
export function useMounted(
  vars: TabMediatorVars,
  buttonReference: TabButtonReference,
): void {
  vars.buttonReference = buttonReference;
}
