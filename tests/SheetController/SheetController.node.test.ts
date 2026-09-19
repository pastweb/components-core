import { afterEach, describe, expect, it, vi } from 'vitest';
import { sheetControllerMediator } from '../../src/SheetController';
import type { SheetControllerDefaultProps } from '../../src/SheetController';

function props(overrides: Partial<SheetControllerDefaultProps> = {}): SheetControllerDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Settings',
    animationTime: 400,
    backdrop: true,
    className: '',
    closeOnBackdropClick: true,
    closeOnEscape: true,
    direction: 'left',
    modal: true,
    onClose: vi.fn(),
    onKeyDown: vi.fn(),
    ...overrides,
  };
}

afterEach(() => {
  vi.useRealTimers();
});

describe('sheetControllerMediator', () => {
  it('given a mounted sheet, when initialized, then it receives focus', () => {
    const focus = vi.fn();
    sheetControllerMediator(props()).useMounted({ focus });
    expect(focus).toHaveBeenCalledOnce();
  });

  it('given Escape is enabled, when pressed, then close starts after the consumer callback', () => {
    const events: string[] = [];
    const mediator = sheetControllerMediator(props({ onKeyDown: () => events.push('keydown') }));
    mediator.onKeyDown({ key: 'Escape', preventDefault: () => events.push('prevent') });
    expect(events).toEqual(['keydown', 'prevent']);
    expect(mediator.state).toMatchObject({ isOpen: false, isClosing: true, isClosed: false });
  });

  it('given the consumer prevents Escape, when pressed, then the sheet remains open', () => {
    const mediator = sheetControllerMediator(props({ onKeyDown: event => { event.defaultPrevented = true; } }));
    mediator.onKeyDown({ key: 'Escape' });
    expect(mediator.state.isOpen).toBe(true);
  });

  it('given a close animation, when it completes, then removal and callback happen once', () => {
    const remove = vi.fn();
    const onClose = vi.fn();
    const mediator = sheetControllerMediator(props({ entryId: 'settings', portal: { remove } as any, onClose }));
    mediator.onClose();
    mediator.onTransitionEnd();
    mediator.onTransitionEnd();
    expect(remove).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledWith('settings');
    expect(onClose).toHaveBeenCalledOnce();
    expect(mediator.state).toMatchObject({ isOpen: false, isClosing: false, isClosed: true });
  });

  it('given no transition event, when the timeout expires, then close is finalized', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const mediator = sheetControllerMediator(props({ animationTime: 250, onClose }));
    mediator.onBackdrop();
    vi.advanceTimersByTime(250);
    expect(onClose).toHaveBeenCalledOnce();
    expect(mediator.state.isClosed).toBe(true);
  });
});
