import { effect, reactive } from '@pastweb/tools';
import type {
  NotificationDefaultProps,
  NotificationMediator,
  NotificationState,
} from './types';
import { getAriaLabel, getRole, onClose } from './utils';

export function notificationMediator(
  props: NotificationDefaultProps,
): NotificationMediator {
  const state = reactive<NotificationState>({
    ariaLabel: getAriaLabel(props),
    role: getRole(props),
  });

  effect(
    () => {
      state.ariaLabel = getAriaLabel(props);
      state.role = getRole(props);
    },
    () => props.ariaLabel,
  );

  return {
    onClose: () => onClose(props),
    state,
  };
}
