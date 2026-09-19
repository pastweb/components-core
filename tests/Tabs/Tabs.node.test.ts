import { reactive } from '@pastweb/tools';
import { describe, expect, it, vi } from 'vitest';
import { tabsMediator } from '../../src/Tabs';
import type { TabDefaultProps, TabsDefaultProps } from '../../src/Tabs';

function createProps(
  overrides: Partial<TabsDefaultProps> = {},
): TabsDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    activeTab: 0,
    ariaLabel: 'Sections',
    className: '',
    disabled: false,
    onChange: vi.fn(),
    ...overrides,
  };
}

function create() {
  const onChange = vi.fn();
  const mediator = tabsMediator(createProps({ onChange }));
  const context = mediator.getContext();

  context.registerTab({} as TabDefaultProps);
  context.registerTab({} as TabDefaultProps);
  context.registerTab({} as TabDefaultProps);

  return { context, mediator, onChange };
}

describe('tabsMediator', () => {
  it('given a Tabs instance, when initialized, then it exposes normalized renderer state', () => {
    const mediator = tabsMediator(createProps());

    expect(mediator.state).toMatchObject({
      activeTab: 0,
      ariaLabel: 'Sections',
      className: '',
      isDisabled: undefined,
      orientation: 'horizontal',
    });

    mediator.useBeforeUnmount();
  });

  it('given a Tab and panel index, when relationship IDs are requested, then mediator-owned IDs use the standard format', () => {
    const mediator = tabsMediator(createProps());

    const context = mediator.getContext();

    expect(context.getTabId(0)).toMatch(/^tabtabs_/);
    expect(context.getContentId(0)).toMatch(/^paneltabs_/);
    expect(context.getTabId(0)).not.toContain('-tab-');
    expect(context.getContentId(0)).not.toContain('-panel-');

    mediator.useBeforeUnmount();
  });

  it('given tabs, when an enabled Tab is selected, then state and callback update', () => {
    const { context, mediator, onChange } = create();

    context.setActiveTab(1);

    expect(mediator.state.activeTab).toBe(1);
    expect(onChange).toHaveBeenCalledWith(1);
    mediator.useBeforeUnmount();
  });

  it('given a disabled Tab, when selection is requested, then selection does not change', () => {
    const mediator = tabsMediator(createProps());

    const context = mediator.getContext();
    context.registerTab({ disabled: false } as TabDefaultProps);
    context.registerTab({ disabled: true } as TabDefaultProps);
    context.setActiveTab(1);

    expect(mediator.state.activeTab).toBe(0);
    mediator.useBeforeUnmount();
  });

  it('given the last Tab, when ArrowRight is pressed, then selection wraps', () => {
    const { context, mediator } = create();

    context.onTabKeyDown(
      { key: 'ArrowRight', preventDefault: vi.fn() },
      2,
    );

    expect(mediator.state.activeTab).toBe(0);
    mediator.useBeforeUnmount();
  });

  it('given a left-positioned Tabs instance, when ArrowDown is pressed, then the next enabled Tab is selected', () => {
    const mediator = tabsMediator(createProps({ className: 'is-left' }));

    const context = mediator.getContext();
    context.registerTab({ disabled: false } as TabDefaultProps);
    context.registerTab({ disabled: true } as TabDefaultProps);
    context.registerTab({ disabled: false } as TabDefaultProps);
    context.onTabKeyDown(
      { key: 'ArrowDown', preventDefault: vi.fn() },
      0,
    );

    expect(mediator.state.activeTab).toBe(2);
    mediator.useBeforeUnmount();
  });

  it('given reactive properties, when they change, then state and context stay normalized', async () => {
    const props = reactive(createProps());
    const mediator = tabsMediator(props);
    const context = mediator.getContext();

    props.activeTab = -1;
    props.ariaLabel = '';
    props.className = 'is-right';
    props.disabled = true;

    await vi.waitFor(() => {
      expect(mediator.state).toMatchObject({
        activeTab: 0,
        ariaLabel: undefined,
        className: 'is-right',
        isDisabled: true,
        orientation: 'vertical',
      });
      expect(context.state.ariaLabel).toBeUndefined();
      expect(context.state.className).toBe('is-right');
      expect(context.state.isDisabled).toBe(true);
      expect(context.state.orientation).toBe('vertical');
    });

    mediator.useBeforeUnmount();
  });

  it('given a horizontal positioning utility, when initialized, then semantic orientation remains horizontal', () => {
    const mediator = tabsMediator(createProps({
      className: 'custom-tabs is-bottom-right',
    }));

    expect(mediator.state.orientation).toBe('horizontal');
    expect(mediator.getContext().state.orientation).toBe('horizontal');

    mediator.useBeforeUnmount();
  });
});
