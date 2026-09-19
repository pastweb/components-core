import { describe, expect, it, vi } from 'vitest';
import { selectMediator } from '../../src/Select';
import type { SelectDefaultProps, SelectFocusableReference } from '../../src/Select';

function props(overrides: Partial<SelectDefaultProps> = {}): SelectDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Select an option',
    className: '',
    closeOnSelect: true,
    disabled: false,
    label: '',
    labelPlacement: 'top-start',
    loading: false,
    offset: 3,
    onChange: vi.fn(),
    placeholder: 'Select',
    tabIndex: 0,
    id: 'country',
    ...overrides,
  };
}

describe('selectMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = selectMediator(props({ id: undefined }));
    const explicit = selectMediator(props({ id: 'country' }));

    expect(generated.state.inputId).toMatch(/^select_/);
    expect(generated.state.triggerId).toBe(`trigger${generated.state.inputId}`);
    expect(explicit.state.inputId).toBe('country');
    expect(explicit.state.labelId).toBe('labelcountry');
    expect(explicit.state.listboxId).toBe('listboxcountry');
    expect(explicit.state.triggerId).toBe('triggercountry');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given an enabled select, when opened with ArrowDown, then the first option is focused', () => {
    const focus = vi.fn();
    const mediator = selectMediator(props());
    mediator.useMounted({ focus: vi.fn() }, { children: [{ focus }, { focus: vi.fn() }] });
    mediator.onKeyDown({ key: 'ArrowDown', preventDefault: vi.fn() });
    expect(mediator.state.isOpen).toBe(true);
    expect(mediator.state.highlightIndex).toBe(0);
    expect(focus).toHaveBeenCalled();
    mediator.useBeforeUnmount();
  });

  it('given an open select, when a value is selected, then it closes and reports the value', () => {
    const onChange = vi.fn();
    const trigger: SelectFocusableReference = { focus: vi.fn() };
    const mediator = selectMediator(props({ onChange }));
    mediator.useMounted(trigger, { children: [] });
    mediator.onOpen();
    mediator.onChange('uk');
    expect(mediator.state.value).toBe('uk');
    expect(mediator.state.isOpen).toBe(false);
    expect(onChange).toHaveBeenCalledWith('uk');
    expect(trigger.focus).toHaveBeenCalled();
    mediator.useBeforeUnmount();
  });

  it('given a disabled select, when opening is requested, then it remains closed', () => {
    const mediator = selectMediator(props({ disabled: true }));
    mediator.onOpen();
    expect(mediator.state.isOpen).toBe(false);
    expect(mediator.state.isUnavailable).toBe(true);
    expect(mediator.state.isDisabled).toBe(true);
    mediator.useBeforeUnmount();
  });
});
