import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { inputMediator } from '../../src/Input';
import type { InputDefaultProps } from '../../src/Input';

function createProps(overrides: Partial<InputDefaultProps> = {}): InputDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Input',
    className: '',
    tabIndex: 0,
    type: 'text',
    placeholder: '',
    disabled: false,
    loading: false,
    required: false,
    value: '',
    onChange: vi.fn(),
    onKeyDown: vi.fn(),
    label: '',
    labelPlacement: 'top-start',
    incrementTitle: 'Increment',
    decrementTitle: 'Decrement',
    ...overrides,
  };
}

describe('inputMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = inputMediator(createProps());
    const explicit = inputMediator(createProps({ id: 'email-address' }));

    expect(generated.state.inputId).toMatch(/^input_/);
    expect(explicit.state.inputId).toBe('email-address');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given the default accessible name, when no visible label is supplied, then ariaLabel is the default', () => {
    const mediator = inputMediator(createProps());

    expect(mediator.state.ariaLabel).toBe('Input');
    expect(mediator.state.isDisabled).toBeUndefined();
    expect(mediator.state.isLoading).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given a visible label, when initialized, then ariaLabel is omitted', () => {
    const mediator = inputMediator(createProps({ label: 'Display name' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given an explicit empty ariaLabel, when initialized, then the accessible name is omitted', () => {
    const mediator = inputMediator(createProps({ ariaLabel: '' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given an available input, when changed, then it reports the value and event', () => {
    const onChange = vi.fn();
    const event = {};
    const mediator = inputMediator(createProps({ onChange }));

    mediator.onChange('Pastweb', event);

    expect(onChange).toHaveBeenCalledWith('Pastweb', event);
    mediator.useBeforeUnmount();
  });

  it('given a disabled or loading input, when changed, then it does not report a value', () => {
    const disabledChange = vi.fn();
    const loadingChange = vi.fn();
    const disabled = inputMediator(createProps({ disabled: true, onChange: disabledChange }));
    const loading = inputMediator(createProps({ loading: true, onChange: loadingChange }));

    disabled.onChange('Blocked', {});
    loading.onChange('Blocked', {});

    expect(disabled.state.isDisabled).toBe(true);
    expect(loading.state.isLoading).toBe(true);
    expect(disabledChange).not.toHaveBeenCalled();
    expect(loadingChange).not.toHaveBeenCalled();
    disabled.useBeforeUnmount();
    loading.useBeforeUnmount();
  });

  it('given a number input, when ArrowUp is received, then native stepping is not duplicated', () => {
    const onKeyDown = vi.fn();
    const stepUp = vi.fn();
    const mediator = inputMediator(createProps({ type: 'number', onKeyDown }));
    mediator.useMounted({ value: '1', stepUp, stepDown: vi.fn() });

    mediator.onKeyDown({ key: 'ArrowUp' });

    expect(stepUp).not.toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalledWith({ key: 'ArrowUp' });
    mediator.useBeforeUnmount();
  });

  it('given a number reference, when incremented, then it reports the stepped value without a DOM event', () => {
    const onChange = vi.fn();
    const reference = {
      value: '1',
      stepUp() { reference.value = '2'; },
    };
    const mediator = inputMediator(createProps({ type: 'number', value: '1', onChange }));
    mediator.useMounted(reference);

    mediator.stepUp();

    expect(onChange).toHaveBeenCalledWith('2', undefined);
    mediator.useBeforeUnmount();
  });

  it('given input props change, when effects run, then state exposes current values', async () => {
    const props = reactive(createProps({ ariaLabel: 'Search' }));
    const mediator = inputMediator(props);

    props.ariaLabel = '';
    props.disabled = true;
    props.loading = true;

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBeUndefined();
      expect(mediator.state.isDisabled).toBe(true);
      expect(mediator.state.isLoading).toBe(true);
    });
    mediator.useBeforeUnmount();
  });
});
