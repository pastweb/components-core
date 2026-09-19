import { describe, expect, it, vi } from 'vitest';
import { ANIMATIONS, windowControllerMediator } from '../../src/WindowController';
import type { WindowControllerDefaultProps } from '../../src/WindowController';
const props = (overrides: Partial<WindowControllerDefaultProps> = {}): WindowControllerDefaultProps => ({ cls: () => '', animation: ANIMATIONS.fade, ariaLabel: 'Window', className: '', closeOnBackdropClick: true, closeOnEscape: true, minHeight: 120, minWidth: 200, mode: 'modal', moveCursor: true, resizable: false, resizeCursor: true, onClose: vi.fn(), onKeyDown: vi.fn(), ...overrides });
describe('windowControllerMediator', () => {
  it('closes a modal from its backdrop and finalizes once', () => { const onClose = vi.fn(); const m = windowControllerMediator(props({ onClose })); m.onBackdrop(); m.onTransitionEnd(); m.onTransitionEnd(); expect(m.state.isClosed).toBe(true); expect(onClose).toHaveBeenCalledOnce(); });
  it('allows consumers to prevent Escape dismissal', () => { const m = windowControllerMediator(props({ onKeyDown: e => { e.defaultPrevented = true; } })); m.onKeyDown({ key: 'Escape' }); expect(m.state.isOpen).toBe(true); });
  it('moves floating windows and clamps resized dimensions', () => { const m = windowControllerMediator(props({ mode: 'floating', resizable: true })); m.moveBy(20, 30); m.setSize(10, 20); expect(m.state).toMatchObject({ x: 20, y: 30, width: 200, height: 120 }); });
});
