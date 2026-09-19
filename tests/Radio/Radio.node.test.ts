import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { radioMediator } from '../../src/Radio';
import type { RadioDefaultProps } from '../../src/Radio';

function props(overrides: Partial<RadioDefaultProps> = {}): RadioDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Radio options',
    className: '',
    disabled: false,
    label: 'Choice',
    labelPlacement: 'top-start',
    onChange: vi.fn(),
    options: [],
    orientation: 'horizontal',
    value: '',
    ...overrides,
  };
}

describe('radioMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = radioMediator(props());
    const explicit = radioMediator(props({ id: 'delivery' }));

    expect(generated.state.groupId).toMatch(/^radio_/);
    expect(generated.state.groupLabelId).toBe(`label${generated.state.groupId}`);
    expect(generated.getOptionId(1)).toBe(`option${generated.state.groupId}1`);
    expect(explicit.state.groupId).toBe('_delivery');
    expect(explicit.state.groupLabelId).toBe('label_delivery');
    expect(explicit.getOptionId(1)).toBe('option_delivery1');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given no visible label, when initialized, then ariaLabel is the default', () => {
    const mediator = radioMediator(props({ label: '' }));

    expect(mediator.state.ariaLabel).toBe('Radio options');
    expect(mediator.state.groupLabelId).toBeUndefined();
    expect(mediator.state.isDisabled).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given an enabled group, when selection changes, then value and callback are updated', () => {
    const onChange = vi.fn();
    const mediator = radioMediator(props({ onChange }));

    mediator.onChange('email', {});

    expect(mediator.state.value).toBe('email');
    expect(onChange).toHaveBeenCalledWith('email', {});
    mediator.useBeforeUnmount();
  });

  it('given a disabled group, when selection is requested, then it remains unchanged', () => {
    const onChange = vi.fn();
    const mediator = radioMediator(props({ disabled: true, onChange, value: 'phone' }));

    mediator.onChange('email', {});

    expect(mediator.state.value).toBe('phone');
    expect(mediator.state.isDisabled).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    mediator.useBeforeUnmount();
  });

  it('given radio props change, when effects run, then state exposes current values', async () => {
    const nextProps = reactive(props({ id: 'delivery' }));
    const mediator = radioMediator(nextProps);

    nextProps.label = '';
    nextProps.disabled = true;
    nextProps.value = 'email';

    await vi.waitFor(() => {
      expect(mediator.state.groupLabelId).toBeUndefined();
      expect(mediator.state.ariaLabel).toBe('Radio options');
      expect(mediator.state.isDisabled).toBe(true);
      expect(mediator.state.value).toBe('email');
    });
    mediator.useBeforeUnmount();
  });
});
