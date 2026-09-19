import { describe, expect, it, vi } from 'vitest';
import { ANIMATIONS, windowControllerMediator } from '../../src/WindowController';
import type { WindowControllerDefaultProps } from '../../src/WindowController';

function createProps(overrides: Partial<WindowControllerDefaultProps> = {}): WindowControllerDefaultProps {
  return {
    cls: () => '',
    animation: ANIMATIONS.fade,
    ariaLabel: 'Window',
    closeOnBackdropClick: true,
    closeOnEscape: true,
    entryId: 'window',
    mode: 'modal',
    moveCursor: true,
    onClose: vi.fn(),
    onKeyDown: vi.fn(),
    portal: { update: vi.fn() } as any,
    portalElement: { parentElement: null } as any,
    resizable: false,
    resizeCursor: true,
    ...overrides,
  };
}

describe('windowControllerMediator', () => {
  it('given an unmanaged window, when initialized on the server, then it exposes open renderer state without platform access', () => {
    const mediator = windowControllerMediator(createProps());

    expect(mediator.state).toMatchObject({
      isActive: false,
      isHidden: false,
      isOpen: true,
      manager: undefined,
    });
  });

  it('given an unmanaged window, when context visibility commands run, then local visibility changes', () => {
    const mediator = windowControllerMediator(createProps());
    const context = mediator.getContext();

    context.hide();
    expect(mediator.state.isHidden).toBe(true);
    context.show();
    expect(mediator.state.isHidden).toBe(false);
    expect(context.minimize()).toBe(false);
  });
});
