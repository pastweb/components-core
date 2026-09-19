import { describe, expect, it, vi } from 'vitest';
import { splitLayoutMediator } from '../../src/SplitLayout';
import type { SplitLayoutDefaultProps } from '../../src/SplitLayout';

function props(overrides: Partial<SplitLayoutDefaultProps> = {}): SplitLayoutDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '), ariaLabel: 'Workspace',
    className: '', disabled: false, keyboardStep: 2, minSize: 10,
    onSizesChange: vi.fn(), orientation: 'horizontal', sizes: [], ...overrides,
  };
}

describe('splitLayoutMediator', () => {
  it('given two panels without sizes, when registered, then equal percentages are created', () => {
    const mediator = splitLayoutMediator(props());
    mediator.setItemCount(2);
    expect(mediator.state.sizes).toEqual([50, 50]);
  });

  it('given an active separator, when resized, then adjacent sizes and callback update', () => {
    const onSizesChange = vi.fn();
    const mediator = splitLayoutMediator(props({ onSizesChange }));
    mediator.setItemCount(2);
    mediator.onResizeStart(0);
    mediator.onResize(20);
    expect(mediator.state.sizes).toEqual([70, 30]);
    expect(onSizesChange).toHaveBeenCalledWith([70, 30]);
  });

  it('given minimum sizes, when resize exceeds bounds, then both panels remain available', () => {
    const mediator = splitLayoutMediator(props());
    mediator.setItemCount(2);
    mediator.onResizeStart(0);
    mediator.onResize(100);
    expect(mediator.state.sizes).toEqual([90, 10]);
  });

  it('given keyboard resizing, when ArrowRight is pressed, then the configured step is applied', () => {
    const mediator = splitLayoutMediator(props());
    mediator.setItemCount(2);
    mediator.onSeparatorKeyDown({ key: 'ArrowRight', preventDefault: vi.fn() }, 0);
    expect(mediator.state.sizes).toEqual([52, 48]);
  });

  it('given a disabled layout, when resizing is requested, then sizes remain unchanged', () => {
    const mediator = splitLayoutMediator(props({ disabled: true }));
    mediator.setItemCount(2);
    mediator.onResizeStart(0);
    mediator.onSeparatorKeyDown({ key: 'ArrowRight' }, 0);
    expect(mediator.state.sizes).toEqual([50, 50]);
  });

  it('given three panels, when separator values are read, then the maximum is scoped to its adjacent pair', () => {
    const mediator = splitLayoutMediator(props({ sizes: [20, 30, 50] }));
    mediator.setItemCount(3);
    expect(mediator.getSeparatorValue(0)).toEqual({ min: 10, max: 40, now: 20 });
  });
});
