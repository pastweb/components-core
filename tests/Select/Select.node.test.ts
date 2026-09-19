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
    expect(explicit.state.inputId).toBe('_country');
    expect(explicit.state.labelId).toBe('label_country');
    expect(explicit.state.listboxId).toBe('listbox_country');
    expect(explicit.state.triggerId).toBe('trigger_country');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given server rendering, when opened by keyboard, then it derives open state without mounting DOM listeners', () => {
    const mediator = selectMediator(props());

    mediator.onKeyDown({ key: 'ArrowDown', preventDefault: vi.fn() });

    expect(mediator.state.isOpen).toBe(true);
    expect(mediator.state.highlightIndex).toBeNull();
    mediator.useBeforeUnmount();
  });

  it('given an open select, when a value is selected before mounting, then it reports the value', () => {
    const onChange = vi.fn();
    const mediator = selectMediator(props({ onChange }));

    mediator.onOpen();
    mediator.onChange('uk');

    expect(mediator.state.value).toBe('uk');
    expect(onChange).toHaveBeenCalledWith('uk');
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
