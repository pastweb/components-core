import { afterEach, describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { dropdownMediator } from '../../src/DropDown';
import type { DropDownDefaultProps, DropDownMediatorVars } from '../../src/DropDown/types';
import { hide, isInside, onBlur, onClick, onClickOut } from '../../src/DropDown/utils';

function createProps(overrides: Partial<DropDownDefaultProps> = {}): DropDownDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'DropDown',
    arrow: true,
    className: '',
    contentClassName: '',
    offset: 2,
    disabled: false,
    isVisible: false,
    visibleOn: 'click',
    placement: 'bottom',
    hideOnClickOut: true,
    hideOnBlur: true,
    position: 'absolute',
    clickTimeGap: 16,
    onClick: vi.fn(),
    onChange: vi.fn(),
    onContext: vi.fn(),
    onClickOut: vi.fn(),
    onMouseEnter: vi.fn(),
    onMouseLeave: vi.fn(),
    ...overrides,
  };
}

afterEach(() => {
  vi.useRealTimers();
});

describe('dropdownMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = dropdownMediator(createProps());
    const explicit = dropdownMediator(createProps({ id: 'account-actions' }));

    expect(generated.id).toMatch(/^dropDown_/);
    expect(generated.state.triggerId).toMatch(/^triggerdropDown_/);
    expect(generated.state.contentId).toMatch(/^contentdropDown_/);
    expect(explicit.id).toBe('_account-actions');
    expect(explicit.state.triggerId).toBe('trigger_account-actions');
    expect(explicit.state.contentId).toBe('content_account-actions');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given the default accessible name, when initialized, then ariaLabel is the default', () => {
    const mediator = dropdownMediator(createProps());

    expect(mediator.state.ariaLabel).toBe('DropDown');
    expect(mediator.state.isDisabled).toBeUndefined();
    expect(mediator.state.isVisible).toBe(false);
    mediator.useBeforeUnmount();
  });

  it('given an explicit empty ariaLabel, when initialized, then the accessible name is omitted', () => {
    const mediator = dropdownMediator(createProps({ ariaLabel: '' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given click activation, when activated, then visibility and callback state update', () => {
    vi.useFakeTimers();
    const onClick = vi.fn();
    const mediator = dropdownMediator(createProps({ onClick }));

    mediator.onClick();
    vi.advanceTimersByTime(16);

    expect(mediator.state.isVisible).toBe(true);
    expect(onClick).toHaveBeenCalledOnce();
    mediator.useBeforeUnmount();
  });

  it('given a disabled dropdown, when activated, then it remains closed', () => {
    vi.useFakeTimers();
    const onClick = vi.fn();
    const mediator = dropdownMediator(createProps({ disabled: true, onClick }));

    mediator.onClick();
    vi.runAllTimers();

    expect(mediator.state.isVisible).toBe(false);
    expect(mediator.state.isDisabled).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
    mediator.useBeforeUnmount();
  });

  it('given an open dropdown, when Escape is pressed, then it closes and prevents the default', () => {
    const preventDefault = vi.fn();
    const mediator = dropdownMediator(createProps({ isVisible: true }));

    mediator.onKeyDown({ key: 'Escape', preventDefault });

    expect(mediator.state.isVisible).toBe(false);
    expect(preventDefault).toHaveBeenCalledOnce();
    mediator.useBeforeUnmount();
  });

  it('given dropdown props change, when effects run, then state exposes current values', async () => {
    const props = reactive(createProps());
    const mediator = dropdownMediator(props);

    props.ariaLabel = '';
    props.disabled = true;
    props.isVisible = true;

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBeUndefined();
      expect(mediator.state.isDisabled).toBe(true);
      expect(mediator.state.isVisible).toBe(false);
    });
    mediator.useBeforeUnmount();
  });

  it('given an open dropdown, when hide is called from context, then live context getters update', () => {
    const mediator = dropdownMediator(createProps({ isVisible: true }));
    const context = mediator.getContext();

    expect(context.isVisible).toBe(true);
    expect(context.id).toBe(mediator.id);

    context.hide();

    expect(context.isVisible).toBe(false);
    expect(mediator.state.isVisible).toBe(false);
    mediator.useBeforeUnmount();
  });
});

function createVars(overrides: Partial<DropDownMediatorVars> = {}): DropDownMediatorVars {
  return {
    rootReference: undefined,
    targetReference: undefined,
    containerReference: undefined,
    contentReference: undefined,
    arrowReference: undefined,
    clickTimer: undefined,
    elementClicked: false,
    outsideClickListener: undefined,
    ...overrides,
  };
}

describe('hide', () => {
  it('given an open dropdown, when hide is called, then it is not visible', () => {
    const state = { isVisible: true } as any;

    hide(state);

    expect(state.isVisible).toBe(false);
  });
});

describe('onBlur', () => {
  it('given focus is moving into the container, when onBlur is called, then it stays visible', () => {
    const next = {};
    const props = createProps({ isVisible: true });
    const state = { isVisible: true } as any;
    const vars = createVars({
      rootReference: { contains: () => false } as unknown as HTMLElement,
      containerReference: { contains: (node: unknown) => node === next } as HTMLElement,
    });

    onBlur(props, state, vars, { relatedTarget: next as EventTarget });

    expect(state.isVisible).toBe(true);
  });

  it('given focus is leaving the dropdown, when onBlur is called, then it hides', () => {
    const props = createProps({ isVisible: true });
    const state = { isVisible: true } as any;
    const vars = createVars({
      rootReference: { contains: () => false } as unknown as HTMLElement,
      containerReference: { contains: () => false } as unknown as HTMLElement,
    });

    onBlur(props, state, vars, { relatedTarget: {} as EventTarget });

    expect(state.isVisible).toBe(false);
  });
});

describe('isInside', () => {
  it('given a container that contains the node, when isInside is called, then it returns true', () => {
    const node = {};
    const el = { contains: (value: unknown) => value === node } as HTMLElement;

    expect(isInside(el, node as EventTarget)).toBe(true);
  });

  it('given a missing element or node, when isInside is called, then it returns false', () => {
    expect(isInside(undefined, {})).toBe(false);
    expect(isInside({ contains: () => true } as unknown as HTMLElement, undefined)).toBe(false);
  });
});

describe('onClick', () => {
  it('given an open dropdown, when onClick is invoked from content, then it stays visible and does not toggle', () => {
    vi.useFakeTimers();
    const item = {};
    const props = createProps({ isVisible: true });
    const state = { isVisible: true } as any;
    const vars = createVars({
      targetReference: { contains: () => false } as unknown as HTMLElement,
      containerReference: { contains: (node: unknown) => node === item } as HTMLElement,
    });

    onClick(props, state, vars, { target: item as EventTarget });
    vi.advanceTimersByTime(16);

    expect(state.isVisible).toBe(true);
    expect(props.onClick).not.toHaveBeenCalled();
  });

  it('given a closed dropdown, when onClick is invoked from the trigger, then it becomes visible', () => {
    vi.useFakeTimers();
    const trigger = {};
    const props = createProps();
    const state = { isVisible: false } as any;
    const vars = createVars({
      targetReference: { contains: (node: unknown) => node === trigger } as HTMLElement,
      containerReference: { contains: () => false } as unknown as HTMLElement,
    });

    onClick(props, state, vars, { target: trigger as EventTarget });
    vi.advanceTimersByTime(16);

    expect(state.isVisible).toBe(true);
    expect(props.onClick).toHaveBeenCalledOnce();
  });
});

describe('onClickOut', () => {
  it('given an open dropdown, when onClickOut receives a click inside the container, then it stays visible', () => {
    const item = {};
    const props = createProps({ isVisible: true });
    const state = { isVisible: true } as any;
    const vars = createVars({
      rootReference: { contains: () => false } as unknown as HTMLElement,
      containerReference: { contains: (node: unknown) => node === item } as HTMLElement,
    });

    onClickOut(props, state, vars, { target: item as EventTarget });

    expect(state.isVisible).toBe(true);
    expect(props.onClickOut).not.toHaveBeenCalled();
  });

  it('given an open dropdown, when onClickOut receives a click outside, then it hides', () => {
    const props = createProps({ isVisible: true });
    const state = { isVisible: true } as any;
    const vars = createVars({
      rootReference: { contains: () => false } as unknown as HTMLElement,
      containerReference: { contains: () => false } as unknown as HTMLElement,
    });

    onClickOut(props, state, vars, { target: {} as EventTarget });

    expect(state.isVisible).toBe(false);
    expect(props.onClickOut).toHaveBeenCalledOnce();
  });
});
