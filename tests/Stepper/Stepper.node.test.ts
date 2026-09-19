import { describe, expect, it } from 'vitest';
import { stepperMediator } from '../../src/Stepper';

describe('stepperMediator', () => {
  it('given an active step, when states are requested, then progress is classified', () => {
    const mediator = stepperMediator({ cls: () => '', steps: [], active: 2, ariaLabel: 'Checkout', className: '', orientation: 'horizontal', labelPosition: 'bottom' });
    expect([0, 1, 2].map(mediator.getStepState)).toEqual(['complete', 'active', 'pending']);
    expect(mediator.state.ariaLabel).toBe('Checkout');
    expect(mediator.uid).toMatch(/^stepper_/);
    mediator.useBeforeUnmount();
  });
});
