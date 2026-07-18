import { reactive } from '@pastweb/tools';
import { idCache } from '../../utils';
import type { AccordionPanelDefaultProps, AccordionPanelMediator, AccordionPanelState } from './types';

export function accordionPanelMediator(props: AccordionPanelDefaultProps): AccordionPanelMediator {
  const uid = idCache.getId();
  const state = reactive<AccordionPanelState>({
    isOpen: !!props.isOpen,
    hideBorderBottom: true,
  });

  function onToggleClick(): void {
    state.isOpen = !state.isOpen;

    if (state.isOpen) {
      state.hideBorderBottom = false;
    } else {
      setTimeout(() => {
        state.hideBorderBottom = true;
      }, props.transitionDuration);
    }
  }

  function onUnmount(): void {
    idCache.removeId(uid);
  }

  return { state, onToggleClick, uid, onUnmount };
}
