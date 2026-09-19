import { effect, getContextUtils, reactive } from '@pastweb/tools';
import { CAROUSEL_CONTEXT_KEY } from '../constants';
import type { CarouselContext } from '../types';
import type {
  CarouselItemDefaultProps,
  CarouselItemMediator,
  CarouselItemState,
} from './types';
import {
  updateState,
} from './utils';

export function carouselItemMediator(
  props: CarouselItemDefaultProps,
): CarouselItemMediator {
  const { getContext } = getContextUtils();
  const context = getContext<CarouselContext>(CAROUSEL_CONTEXT_KEY);
  const state = reactive<CarouselItemState>({
    ariaHidden: true,
    ariaLabel: 'Slide 1 of 0',
    ariaRoleDescription: 'slide',
    className: '',
    index: 0,
    inert: true,
    isActive: false,
    isDisabled: undefined,
    role: 'group',
  });

  updateState(props, state, context);

  effect(
    () => updateState(props, state, context),
    () => [
      context?.current,
      context?.isDisabled,
      context?.itemsCount,
      props.className,
      props.disabled,
      state.index,
    ],
  );

  function useBeforeMount(): void {
    if (!context) return;
    state.index = context.registerItem();
    updateState(props, state, context);
  }

  return {
    state,
    useBeforeMount,
  };
}
