import { describe, expect, it, vi } from 'vitest';
import { toggleMediator } from '../../src/Toggle';

describe('toggleMediator', () => {
  it('given no id, when initialized, then a valid generated id is exposed', () => {
    const mediator = toggleMediator({ cls: () => '', ariaLabel: 'Toggle', className: '', disabled: false, label: '', labelPlacement: 'top-start', onChange: vi.fn(), tabIndex: 0, value: false });
    expect(mediator.state.inputId).toMatch(/^toggle_/);
    expect(mediator.state.inputId).not.toContain('undefined');
    expect(mediator.state.isDisabled).toBeUndefined();
    mediator.useBeforeUnmount();
  });

  it('given an enabled toggle, when changed, then state and callback update', () => {
    const onChange = vi.fn();
    const mediator = toggleMediator({ cls: () => '', ariaLabel: 'Toggle', className: '', disabled: false, label: '', labelPlacement: 'top-start', onChange, tabIndex: 0, value: false });
    mediator.onChange(true, {});
    expect(mediator.state.value).toBe(true);
    expect(onChange).toHaveBeenCalledWith(true, {});
    mediator.useBeforeUnmount();
  });
});
