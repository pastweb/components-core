import { describe, expect, it, vi } from 'vitest';
import { textAreaMediator } from '../../src/TextArea';

describe('textAreaMediator', () => {
  it('given an editable textarea, when changed, then its value is reported', () => {
    const onChange = vi.fn();
    const mediator = textAreaMediator({ cls: () => '', ariaLabel: 'TextArea', className: '', disabled: false, isLoading: false, label: '', labelPlacement: 'top-start', onChange, placeholder: '', readOnly: false, required: false, resizeable: false, tabIndex: 0, value: '' });
    mediator.onChange('Hello');
    expect(onChange).toHaveBeenCalledWith('Hello');
    expect(mediator.state.inputId).toMatch(/^textArea_/);
    mediator.useBeforeUnmount();
  });
});
