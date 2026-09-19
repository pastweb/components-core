import {
  createMediatorContextUtils,
  reactive,
} from '@pastweb/tools';
import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_TAB_CONTENT_PROPS,
  TABS_CONTEXT_KEY,
  tabContentMediator,
  tabsMediator,
} from '../../src/Tabs';
import type {
  TabContentDefaultProps,
  TabContentMediator,
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

function createTabContentProps(
  overrides: Partial<TabContentDefaultProps> = {},
): TabContentDefaultProps {
  return {
    cls,
    ...DEFAULT_TAB_CONTENT_PROPS,
    ...overrides,
  };
}

function createTabContent(
  props: TabContentDefaultProps,
  tabs: ReturnType<typeof tabsMediator>,
): TabContentMediator {
  return createMediatorContextUtils(
    tabContentMediator,
    props,
    {},
    {
      getContext: key => (
        key === TABS_CONTEXT_KEY ? tabs.getContext() : undefined
      ),
      setContext: vi.fn(),
    },
  );
}

describe('tabContentMediator', () => {
  it('given the first TabContent, when initialized, then it exposes active renderer-ready state', () => {
    const tabs = tabsMediator(createTabsProps());
    const content = createTabContent(
      createTabContentProps(),
      tabs,
    );

    expect(content.state).toMatchObject({
      ariaLabelledBy: tabs.getTabId(0),
      hidden: undefined,
      id: tabs.getContentId(0),
      index: 0,
      isActive: true,
    });

    tabs.useBeforeUnmount();
  });

  it('given multiple TabContent instances, when registered, then each receives stable matching relationship IDs', () => {
    const tabs = tabsMediator(createTabsProps());
    const first = createTabContent(createTabContentProps(), tabs);
    const second = createTabContent(createTabContentProps(), tabs);

    expect(first.state.index).toBe(0);
    expect(second.state).toMatchObject({
      ariaLabelledBy: tabs.getTabId(1),
      hidden: true,
      id: tabs.getContentId(1),
      index: 1,
      isActive: false,
    });

    tabs.useBeforeUnmount();
  });

  it('given root and local TabContent utility classes, when initialized, then both are composed through context', () => {
    const tabsProps = createTabsProps();
    tabsProps.className = 'no-content-padding no-content-border';
    const tabs = tabsMediator(tabsProps);
    const content = createTabContent(
      createTabContentProps({ className: 'no-padding' }),
      tabs,
    );

    expect(content.state.className).toContain('no-content-padding');
    expect(content.state.className).toContain('no-content-border');
    expect(content.state.className).toContain('no-padding');

    tabs.useBeforeUnmount();
  });

  it('given reactive Tabs props, when activeTab changes, then active and hidden state stay synchronized', async () => {
    const tabsProps = reactive(createTabsProps());
    const tabs = tabsMediator(tabsProps);

    createTabContent(createTabContentProps(), tabs);
    const content = createTabContent(createTabContentProps(), tabs);

    tabsProps.activeTab = 1;

    await vi.waitFor(() => {
      expect(content.state).toMatchObject({
        hidden: undefined,
        index: 1,
        isActive: true,
      });
    });

    tabsProps.activeTab = 0;

    await vi.waitFor(() => {
      expect(content.state).toMatchObject({
        hidden: true,
        index: 1,
        isActive: false,
      });
    });

    tabs.useBeforeUnmount();
  });
});
