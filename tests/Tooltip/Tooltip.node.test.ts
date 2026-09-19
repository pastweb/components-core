import { afterEach, describe, expect, it, vi } from 'vitest';
import { tooltipMediator } from '../../src/Tooltip';
import type { TooltipDefaultProps } from '../../src/Tooltip';

function props(overrides: Partial<TooltipDefaultProps> = {}): TooltipDefaultProps {
  return { cls: () => '', className: '', content: 'Helpful text', disabled: false, hideDelay: 0, offset: 8, placement: 'top', showDelay: 300, tooltipClassName: '', ...overrides };
}

afterEach(() => vi.useRealTimers());

describe('tooltipMediator', () => {
  it('given pointer timing, when delays expire, then visibility changes', () => {
    vi.useFakeTimers();
    const mediator = tooltipMediator(props({ hideDelay: 100 }));
    mediator.show();
    expect(mediator.state.isVisible).toBe(false);
    vi.advanceTimersByTime(300);
    expect(mediator.state.isVisible).toBe(true);
    mediator.hide();
    vi.advanceTimersByTime(100);
    expect(mediator.state.isVisible).toBe(false);
  });

  it('given keyboard focus, when shown immediately and Escape is pressed, then it closes', () => {
    const preventDefault = vi.fn();
    const mediator = tooltipMediator(props());
    mediator.show(true);
    mediator.onKeyDown({ key: 'Escape', preventDefault });
    expect(mediator.state.isVisible).toBe(false);
    expect(preventDefault).toHaveBeenCalledOnce();
  });

  it('given a disabled or empty tooltip, when show is requested, then it remains hidden', () => {
    const disabled = tooltipMediator(props({ disabled: true }));
    disabled.show(true);
    expect(disabled.state.isVisible).toBe(false);
    const empty = tooltipMediator(props({ content: '' }));
    empty.show(true);
    expect(empty.state.isVisible).toBe(false);
  });
});
