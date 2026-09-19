import {
  createMediatorContextUtils,
  reactive,
} from '@pastweb/tools';
import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_TAB_PROPS,
  TABS_CONTEXT_KEY,
  tabMediator,
  tabsMediator,
} from '../../src/Tabs';
import type {
  TabDefaultProps,
  TabMediator,
  TabsDefaultProps,
} from '../../src/Tabs';

const cls = (...values: any[]) => values
  .flatMap(value => {
    if (!value) return [];
    if (typeof value === 'string') return value;
    return Object.entries(value)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name);
  })
  .join(' ');

function createTabsProps(): TabsDefaultProps {
  return {
    cls,
    activeTab: 0,
    ariaLabel: 'Sections',
    className: '',
    disabled: false,
    onChange: vi.fn(),
  };
}

function createTabProps(
  overrides: Partial<TabDefaultProps> = {},
): TabDefaultProps {
  return {
    cls,
    ...DEFAULT_TAB_PROPS,
    ...overrides,
  };
}

function createTab(
  props: TabDefaultProps,
  tabs = tabsMediator(createTabsProps()),
): { tab: TabMediator; tabs: ReturnType<typeof tabsMediator> } {
  const tab = createMediatorContextUtils(
    tabMediator,
    props,
    {},
    {
      getContext: key => (
        key === TABS_CONTEXT_KEY ? tabs.getContext() : undefined
      ),
      setContext: vi.fn(),
    },
  );

  return { tab, tabs };
}

describe('tabMediator', () => {
  it('given a Tab inside Tabs, when initialized, then renderer-ready state and relationships are exposed', () => {
    const { tab, tabs } = createTab(createTabProps({
      ariaLabel: 'Account details',
    }));

    expect(tab.state).toMatchObject({
      ariaLabel: 'Account details',
      index: 0,
      isActive: true,
      isDisabled: undefined,
      tabIndex: 0,
    });
    expect(tab.state.id).toBe(tabs.getContext().getTabId(0));
    expect(tab.state.controlsId).toBe(tabs.getContext().getContentId(0));

    tabs.useBeforeUnmount();
  });

  it('given an enabled Tab, when activated, then selection and its callback are delegated', () => {
    const onClick = vi.fn();
    const tabs = tabsMediator(createTabsProps());

    createTab(createTabProps(), tabs);
    const { tab } = createTab(createTabProps({ onClick }), tabs);
    tab.onActivate();

    expect(tabs.state.activeTab).toBe(1);
    expect(onClick).toHaveBeenCalledOnce();

    tabs.useBeforeUnmount();
  });

  it('given reactive local and inherited state, when it changes, then Tab state stays normalized', async () => {
    const tabsProps = reactive(createTabsProps());
    const tabProps = reactive(createTabProps());
    const tabs = tabsMediator(tabsProps);
    const { tab } = createTab(tabProps, tabs);

    tabProps.ariaLabel = '';
    tabsProps.disabled = true;

    await vi.waitFor(() => {
      expect(tab.state).toMatchObject({
        ariaLabel: undefined,
        isDisabled: true,
      });
    });

    tab.onActivate();
    expect(tabs.state.activeTab).toBe(0);

    tabs.useBeforeUnmount();
  });

  it('given a mounted Tab button, when selection changes, then only keyboard navigation moves focus', async () => {
    const focus = vi.fn();
    const tabs = tabsMediator(createTabsProps());

    createTab(createTabProps(), tabs);
    const { tab } = createTab(createTabProps(), tabs);
    tab.useMounted({ focus });

    tabs.getContext().setActiveTab(1);

    await vi.waitFor(() => {
      expect(tab.state.isActive).toBe(true);
    });
    expect(focus).not.toHaveBeenCalled();

    tabs.getContext().setActiveTab(0);
    await vi.waitFor(() => {
      expect(tab.state.isActive).toBe(false);
    });

    tabs.getContext().onTabKeyDown({ key: 'ArrowRight' }, 0);

    await vi.waitFor(() => {
      expect(tab.state.isActive).toBe(true);
      expect(focus).toHaveBeenCalledOnce();
    });

    tabs.useBeforeUnmount();
  });

});
