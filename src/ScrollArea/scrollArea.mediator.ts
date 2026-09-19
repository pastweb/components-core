import { effect, reactive } from '@pastweb/tools';
import { getAriaLabel, getContentStyle, getScrollAlignment } from './utils';
import type { ScrollAreaDefaultProps, ScrollAreaMediator, ScrollAreaState } from './types';

export function scrollAreaMediator(props: ScrollAreaDefaultProps): ScrollAreaMediator {
  const state = reactive<ScrollAreaState>({
    ariaLabel: getAriaLabel(props),
  });

  effect(
    () => { state.ariaLabel = getAriaLabel(props); },
    () => props.ariaLabel,
  );

  return {
    getContentStyle: () => getContentStyle(props),
    getScrollAlignment: () => getScrollAlignment(props),
    state,
  };
}
