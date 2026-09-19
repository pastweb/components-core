import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { notificationMediator } from '../../src/Notification';
import type { NotificationDefaultProps } from '../../src/Notification';

function createProps(overrides: Partial<NotificationDefaultProps> = {}): NotificationDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: '',
    className: '',
    closeButton: true,
    closeLabel: 'Close notification',
    onClose: vi.fn(),
    rtl: false,
    title: undefined,
    ...overrides,
  };
}

describe('notificationMediator', () => {
  it('given the default accessible name, when initialized, then the region role is omitted', () => {
    const mediator = notificationMediator(createProps());

    expect(mediator.state.ariaLabel).toBeUndefined();
    expect(mediator.state.role).toBeUndefined();
  });

  it('given a named notification, when initialized, then it exposes a region role', () => {
    const mediator = notificationMediator(createProps({ ariaLabel: 'Account notification' }));

    expect(mediator.state.ariaLabel).toBe('Account notification');
    expect(mediator.state.role).toBe('region');
  });

  it('given a closable notification, when closed, then it reports close intent', () => {
    const onClose = vi.fn();
    const mediator = notificationMediator(createProps({ onClose }));

    mediator.onClose();

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('given notification props change, when effects run, then ariaLabel and role stay synchronized', async () => {
    const props = reactive(createProps());
    const mediator = notificationMediator(props);

    props.ariaLabel = 'Account notification';

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBe('Account notification');
      expect(mediator.state.role).toBe('region');
    });

    props.ariaLabel = '';

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBeUndefined();
      expect(mediator.state.role).toBeUndefined();
    });
  });
});
