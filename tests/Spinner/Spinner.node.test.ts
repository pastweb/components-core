import { describe, expect, it } from 'vitest';
import { spinnerMediator } from '../../src/Spinner';

describe('spinnerMediator', () => {
  it('given a meaningful spinner, when initialized, then status semantics are exposed', () => {
    const mediator = spinnerMediator({ cls: () => '', ariaLabel: 'Saving', className: '', decorative: false });
    expect(mediator.state.role).toBe('status');
    expect(mediator.state.ariaLabel).toBe('Saving');
    expect(mediator.state.ariaLive).toBe('polite');
  });

  it('given a decorative spinner, when initialized, then status semantics are omitted', () => {
    const mediator = spinnerMediator({ cls: () => '', ariaLabel: 'Loading', className: '', decorative: true });
    expect(mediator.state.role).toBeUndefined();
    expect(mediator.state.ariaLabel).toBeUndefined();
    expect(mediator.state.ariaLive).toBeUndefined();
  });
});
