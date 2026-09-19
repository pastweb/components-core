import { describe, expect, it, vi } from 'vitest';
import { createMediatorContextUtils, type ContextUtils } from '@pastweb/tools';
import { buttonMediator } from '../../src/Button';
import { BUTTONS_CONTEXT_KEY, type ButtonsContext } from '../../src/Buttons';
import type { ButtonDefaultProps } from '../../src/Button';

function createProps(overrides: Partial<ButtonDefaultProps> = {}): ButtonDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    className: '',
    disabled: false,
    loading: false,
    onClick: vi.fn(),
    tabIndex: 0,
    type: 'button',
    ...overrides,
  };
}

function createMediator(
  overrides: Partial<ButtonDefaultProps> = {},
  buttonsContext?: ButtonsContext,
) {
  const context: ContextUtils = {
    getContext: <T>(key: string) => (
      key === BUTTONS_CONTEXT_KEY ? buttonsContext as T : undefined
    ),
    setContext: vi.fn(),
  };

  return createMediatorContextUtils(
    buttonMediator,
    createProps(overrides),
    {},
    context,
  );
}

describe('buttonMediator', () => {
  it('given generated and explicit IDs, when initialized, then it follows the component ID format', () => {
    const generated = createMediator();
    const explicit = createMediator({ id: 'save' });

    expect(generated.id).toMatch(/^button_/);
    expect(explicit.id).toBe('_save');

    generated.useBeforeUnmount();
    explicit.useBeforeUnmount();
  });

  it('given an available button, when clicked, then it forwards the interaction', () => {
    const onClick = vi.fn();
    const mediator = createMediator({ onClick });
    const event = {};

    mediator.onClick(event);

    expect(onClick).toHaveBeenCalledWith(event);
    expect(mediator.state.isDisabled).toBeUndefined();
    expect(mediator.state.isLoading).toBe(false);
  });

  it('given a loading button, when clicked, then it remains enabled and suppresses the interaction', () => {
    const onClick = vi.fn();
    const mediator = createMediator({ loading: true, onClick });

    mediator.onClick({});

    expect(onClick).not.toHaveBeenCalled();
    expect(mediator.state.isDisabled).toBeUndefined();
    expect(mediator.state.isLoading).toBe(true);
  });

  it('given a disabled button, when clicked, then it suppresses the interaction', () => {
    const onClick = vi.fn();
    const mediator = createMediator({ disabled: true, onClick });

    mediator.onClick({});

    expect(onClick).not.toHaveBeenCalled();
    expect(mediator.state.isDisabled).toBe(true);
    expect(mediator.state.isLoading).toBe(false);
  });

  it('given a disabled buttons context, when clicked, then it suppresses the interaction', () => {
    const onClick = vi.fn();
    const mediator = createMediator({ onClick }, { disabled: true });

    mediator.onClick({});

    expect(onClick).not.toHaveBeenCalled();
    expect(mediator.state.isDisabled).toBe(true);
  });

  it('given the legacy loading class, when initialized, then it retains loading behavior', () => {
    const mediator = createMediator({ className: 'primary is-loading' });

    expect(mediator.state.isLoading).toBe(true);
    expect(mediator.state.isDisabled).toBeUndefined();
  });
});
