import { afterEach, describe, expect, it, vi } from 'vitest';
import { ANIMATIONS, PLACEMENT, toastControllerMediator } from '../../src/ToastController';
import type { ToastControllerDefaultProps } from '../../src/ToastController';
const props = (overrides: Partial<ToastControllerDefaultProps> = {}): ToastControllerDefaultProps => ({ cls: () => '', animation: ANIMATIONS.fade, ariaLabel: 'Notification', className: '', closeOnEscKey: true, delay: 5, padding: 15, pauseTimerOnOver: true, placement: PLACEMENT.topRight, resetTimerOnPause: false, timeUpdate: 10, onClose: vi.fn(), onDestroy: vi.fn(), onKeyDown: vi.fn(), ...overrides });
afterEach(() => vi.useRealTimers());
describe('toastControllerMediator', () => {
  it('auto closes when its timer expires', () => { vi.useFakeTimers(); const onClose = vi.fn(); const m = toastControllerMediator(props({ delay: .02, onClose })); m.useMounted(); vi.advanceTimersByTime(20); expect(m.state.isClosing).toBe(true); expect(onClose).toHaveBeenCalledOnce(); });
  it('pauses and resets progress on pointer entry when configured', () => { vi.useFakeTimers(); const m = toastControllerMediator(props({ delay: 1, resetTimerOnPause: true })); m.useMounted(); vi.advanceTimersByTime(100); m.onPointerEnter(); expect(m.state.progress).toBe(0); });
  it('allows consumers to prevent Escape dismissal', () => { const m = toastControllerMediator(props({ onKeyDown: e => { e.defaultPrevented = true; } })); m.onKeyDown({ key: 'Escape' }); expect(m.state.isOpen).toBe(true); });
});
