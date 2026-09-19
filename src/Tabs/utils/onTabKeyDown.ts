import type {
  TabsContext,
  TabsKeyEvent,
  TabsMediatorVars,
  TabsState,
} from '../types';

/**
 * Moves Tabs selection in response to an orientation-aware navigation key.
 *
 * @example
 * ```ts
 * onTabKeyDown(state, vars, setActiveTab, event, index);
 * ```
 */
export function onTabKeyDown(
  state: TabsState,
  vars: TabsMediatorVars,
  setActiveTab: TabsContext['setActiveTab'],
  event: TabsKeyEvent,
  index: number,
): void {
  const tabCount = vars.tabs.length;

  if (state.isDisabled || !tabCount) return;

  const previous = state.orientation === 'horizontal'
    ? 'ArrowLeft'
    : 'ArrowUp';
  const next = state.orientation === 'horizontal'
    ? 'ArrowRight'
    : 'ArrowDown';
  const direction = event.key === previous
    ? -1
    : event.key === next
      ? 1
      : 0;
  let target: number | undefined;

  if (direction) {
    for (let offset = 1; offset <= tabCount; offset++) {
      const candidate = (index + direction * offset + tabCount) % tabCount;

      if (!vars.tabs[candidate].disabled) {
        target = candidate;
        break;
      }
    }
  }

  if (event.key === 'Home') {
    const homeIndex = vars.tabs.findIndex(tab => !tab.disabled);
    target = homeIndex === -1 ? undefined : homeIndex;
  }

  if (event.key === 'End') {
    for (let i = tabCount - 1; i >= 0; i--) {
      if (!vars.tabs[i].disabled) {
        target = i;
        break;
      }
    }
  }

  if (target === undefined) return;

  event.preventDefault?.();
  setActiveTab(target);
}
