import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ANIMATIONS,
  PLACEMENT,
  toastControllerMediator,
} from '../../src/ToastController';
import type { ToastControllerDefaultProps } from '../../src/ToastController';

const observer = {
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
  takeRecords: vi.fn(() => []),
};

function createProps(
  overrides: Partial<ToastControllerDefaultProps> = {},
): ToastControllerDefaultProps {
  return {
    cls: () => '',
    animation: ANIMATIONS.fade,
    ariaLabel: 'Notification',
    closeOnEscKey: true,
    delay: 5,
    entryId: 'toast-1',
    onClose: vi.fn(),
    onDestroy: vi.fn(),
    onKeyDown: vi.fn(),
    padding: 15,
    pauseTimerOnOver: true,
    placement: PLACEMENT.topRight,
    portal: {
      close: vi.fn(),
      getPortalElement: vi.fn(),
      open: vi.fn(),
      remove: vi.fn(),
      setOnRemove: vi.fn(),
      update: vi.fn(),
    },
    portalElement: document.createElement('div'),
    resetTimerOnPause: false,
    timeUpdate: 10,
    ...overrides,
  };
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', vi.fn(() => observer));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('toastControllerMediator', () => {
  it('given a mounted toast, when initialized in a browser, then it derives placement state and observes the element', () => {
    const mediator = toastControllerMediator(createProps());
    const toast = document.createElement('div');

    mediator.onMounted(toast);

    expect(mediator.state).toMatchObject({
      isOpen: true,
      top: 0,
      x: 'right',
      y: 'top',
    });
    expect(observer.observe).toHaveBeenCalledWith(toast);
  });

  it('given a paused timer configured to reset, when the toast is hovered, then elapsed time is reset', () => {
    const mediator = toastControllerMediator(createProps({ resetTimerOnPause: true }));
    mediator.data.time = 250;

    mediator.onMouseOver();

    expect(mediator.data.time).toBe(0);
  });
});
