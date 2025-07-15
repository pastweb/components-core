import { createState } from '@pastweb/tools';
import type { AccordionPanelDefaultProps, AccordionPanelMediatior, AccordionPanelState } from './types';

export function accordionPanel(props: AccordionPanelDefaultProps): AccordionPanelMediatior {
  const { state, setState } = createState<AccordionPanelState>({
    isOpen: !!props.isOpen,
    hideBorderBottom: true,
  });

  function onToggleClick() {
    const isOpen = !state.isOpen;
    setState({ isOpen });

    if (isOpen) {
      setState({ hideBorderBottom: false });
    } else {
      setTimeout(() => setState({ hideBorderBottom: true }), props.transitionDuration);
    }
  }

  return {
    state,
    onToggleClick,
  };
}
