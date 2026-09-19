import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { buttonsMediator } from '../../src/Buttons';
import type { ButtonsDefaultProps } from '../../src/Buttons';

function createProps(overrides: Partial<ButtonsDefaultProps> = {}): ButtonsDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Actions',
    className: '',
    disabled: false,
    ...overrides,
  };
}

describe('buttonsMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = buttonsMediator(createProps());
    const explicit = buttonsMediator(createProps({ id: 'actions' }));

    expect(generated.id).toMatch(/^buttons_/);
    expect(explicit.id).toBe('_actions');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given a labelled button collection, when initialized, then it exposes its accessible label', () => {
    const mediator = buttonsMediator(createProps());

    expect(mediator.state.ariaLabel).toBe('Actions');
    expect(mediator.state.role).toBe('group');
  });

  it('given an empty accessible label, when initialized, then it omits the label', () => {
    const mediator = buttonsMediator(createProps({ ariaLabel: '' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
    expect(mediator.state.role).toBeUndefined();
  });

  it('given the properties change, when effects run, then state and context expose the current values', async () => {
    const props = reactive(createProps());
    const mediator = buttonsMediator(props);
    const context = mediator.getContext();

    expect(mediator.state.ariaLabel).toBe('Actions');
    expect(mediator.state.isDisabled).toBeUndefined();
    expect(context.disabled).toBeUndefined();

    props.ariaLabel = 'Updated actions';
    props.disabled = true;

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBe('Updated actions');
      expect(mediator.state.isDisabled).toBe(true);
      expect(mediator.state.role).toBe('group');
      expect(context.disabled).toBe(true);
    });

    props.ariaLabel = '';

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBeUndefined();
      expect(mediator.state.role).toBeUndefined();
    });
  });
});
