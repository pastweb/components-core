import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { rangeSliderMediator } from '../../src/RangeSlider';
import type { RangeSliderDefaultProps } from '../../src/RangeSlider';

function props(overrides: Partial<RangeSliderDefaultProps> = {}): RangeSliderDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Range value',
    className: '',
    disabled: false,
    label: '',
    labelPlacement: 'top-start',
    min: 20,
    max: 40,
    onChange: vi.fn(),
    onMouseUp: vi.fn(),
    ...overrides,
  };
}

describe('rangeSliderMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = rangeSliderMediator(props());
    const explicit = rangeSliderMediator(props({ id: 'volume' }));

    expect(generated.state.inputId).toMatch(/^rangeSlider_/);
    expect(explicit.state.inputId).toBe('_volume');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given no value, when initialized, then it uses the midpoint of min and max', () => {
    const mediator = rangeSliderMediator(props());

    expect(mediator.state.value).toBe('30');
    expect(mediator.state.ariaLabel).toBe('Range value');
    expect(mediator.state.isDisabled).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given a visible label, when initialized, then ariaLabel is omitted', () => {
    const mediator = rangeSliderMediator(props({ label: 'Volume' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given an enabled slider, when value changes and ends, then callbacks receive the value', () => {
    const onChange = vi.fn();
    const onMouseUp = vi.fn();
    const mediator = rangeSliderMediator(props({ onChange, onMouseUp }));

    mediator.onChange('35', {});
    mediator.onChangeEnd();

    expect(onChange).toHaveBeenCalledWith('35', {});
    expect(onMouseUp).toHaveBeenCalledWith(35);
    mediator.useBeforeUnmount();
  });

  it('given a disabled slider, when value changes, then state and callbacks remain unchanged', () => {
    const onChange = vi.fn();
    const mediator = rangeSliderMediator(props({ disabled: true, onChange }));

    mediator.onChange('35', {});

    expect(mediator.state.value).toBe('30');
    expect(mediator.state.isDisabled).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    mediator.useBeforeUnmount();
  });

  it('given range slider props change, when effects run, then state exposes current values', async () => {
    const nextProps = reactive(props());
    const mediator = rangeSliderMediator(nextProps);

    nextProps.disabled = true;
    nextProps.label = 'Volume';
    nextProps.value = 38;

    await vi.waitFor(() => {
      expect(mediator.state.isDisabled).toBe(true);
      expect(mediator.state.ariaLabel).toBeUndefined();
      expect(mediator.state.value).toBe('38');
    });
    mediator.useBeforeUnmount();
  });
});
