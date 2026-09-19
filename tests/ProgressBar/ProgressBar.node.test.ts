import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { progressbarMediator } from '../../src/ProgressBar';
import type { ProgressBarDefaultProps } from '../../src/ProgressBar';

function props(overrides: Partial<ProgressBarDefaultProps> = {}): ProgressBarDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Progress',
    className: '',
    label: '%',
    size: 100,
    type: 'linear',
    percentage: 50,
    ...overrides,
  };
}

describe('progressbarMediator', () => {
  it('given the default accessible name, when initialized, then ariaLabel is the default', () => {
    const mediator = progressbarMediator(props());

    expect(mediator.state.ariaLabel).toBe('Progress');
  });

  it('given an explicit empty ariaLabel, when initialized, then the accessible name is omitted', () => {
    const mediator = progressbarMediator(props({ ariaLabel: '' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
  });

  it('given zero percent, when initialized, then it preserves zero', () => {
    expect(progressbarMediator(props({ percentage: 0 })).state.percentage).toBe(0);
  });

  it('given values outside the range, when initialized, then percentage is clamped', () => {
    expect(progressbarMediator(props({ percentage: 120 })).state.percentage).toBe(100);
    expect(progressbarMediator(props({ percentage: -10 })).state.percentage).toBe(0);
  });

  it('given total and current, when initialized, then it calculates accessible value text', () => {
    const state = progressbarMediator(props({ percentage: undefined, total: 8, current: 2 })).state;
    expect(state.percentage).toBe(25);
    expect(state.valueText).toBe('25%');
  });

  it('given progress props change, when effects run, then state exposes current values', async () => {
    const nextProps = reactive(props({ percentage: 25 }));
    const mediator = progressbarMediator(nextProps);

    nextProps.percentage = 80;
    nextProps.ariaLabel = '';

    await vi.waitFor(() => {
      expect(mediator.state.percentage).toBe(80);
      expect(mediator.state.ariaLabel).toBeUndefined();
    });
  });
});
