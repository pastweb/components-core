import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { checkboxMediator } from '../../src/Checkbox';
import type { CheckboxDefaultProps } from '../../src/Checkbox';

function createProps(overrides: Partial<CheckboxDefaultProps> = {}): CheckboxDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Checkbox',
    checkChar: '✔',
    className: '',
    disabled: false,
    label: '',
    labelPlacement: 'top-start',
    onChange: vi.fn(),
    tabIndex: 0,
    value: false,
    ...overrides,
  };
}

describe('checkboxMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = checkboxMediator(createProps());
    const explicit = checkboxMediator(createProps({ id: 'terms' }));

    expect(generated.id).toMatch(/^checkbox_/);
    expect(explicit.id).toBe('_terms');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given the default accessible name, when no visible label is supplied, then ariaLabel is the default', () => {
    const mediator = checkboxMediator(createProps());

    expect(mediator.state.ariaLabel).toBe('Checkbox');
    expect(mediator.state.isDisabled).toBeUndefined();
    expect(mediator.state.value).toBe(false);
    mediator.useBeforeUnmount();
  });

  it('given a visible label, when initialized, then ariaLabel is omitted', () => {
    const mediator = checkboxMediator(createProps({ label: 'Accept terms' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given an explicit empty ariaLabel, when initialized, then the accessible name is omitted', () => {
    const mediator = checkboxMediator(createProps({ ariaLabel: '' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given an available checkbox, when changed, then it updates and reports its value', () => {
    const onChange = vi.fn();
    const mediator = checkboxMediator(createProps({ onChange }));

    mediator.onChange(true);

    expect(mediator.state.value).toBe(true);
    expect(onChange).toHaveBeenCalledWith(true);
    mediator.useBeforeUnmount();
  });

  it('given a boolean value, when changed, then it reports that value', () => {
    const onChange = vi.fn();
    const mediator = checkboxMediator(createProps({ onChange }));

    mediator.onChange(true);

    expect(mediator.state.value).toBe(true);
    expect(onChange).toHaveBeenCalledWith(true);
    mediator.useBeforeUnmount();
  });

  it('given a disabled checkbox, when changed, then its value remains unchanged', () => {
    const onChange = vi.fn();
    const mediator = checkboxMediator(createProps({ disabled: true, onChange }));

    mediator.onChange(true);

    expect(mediator.state.value).toBe(false);
    expect(mediator.state.isDisabled).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    mediator.useBeforeUnmount();
  });

  it('given checkbox props change, when effects run, then state exposes current values', async () => {
    const props = reactive(createProps());
    const mediator = checkboxMediator(props);

    props.ariaLabel = '';
    props.disabled = true;
    props.value = true;

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBeUndefined();
      expect(mediator.state.isDisabled).toBe(true);
      expect(mediator.state.value).toBe(true);
    });
    mediator.useBeforeUnmount();
  });
});
