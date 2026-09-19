import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  getAriaLabel,
  getAriaLive,
  getAriaRoleDescription,
  getClassName,
  getContext,
  getIsDisabled,
  getRole,
  getTransform,
  next,
  onKeyDown,
  prev,
  registerItem,
  useBeforeUnmount,
} from './utils';
import type {
  CarouselDefaultProps,
  CarouselContextMethods,
  CarouselMediator,
  CarouselState,
} from './types';

export function carouselMediator(props: CarouselDefaultProps): CarouselMediator {
  const uid = idCache.getId('carousel');
  const id = props.id ? `_${props.id}` : uid;

  const state = reactive<CarouselState>({
    ariaLabel: getAriaLabel(props),
    ariaLive: getAriaLive(),
    ariaRoleDescription: getAriaRoleDescription(props),
    className: getClassName(props),
    current: props.current,
    isDisabled: getIsDisabled(props),
    itemsCount: 0,
    nextAriaLabel: props.nextAriaLabel,
    prevAriaLabel: props.prevAriaLabel,
    role: getRole(props),
    transform: getTransform(props.current),
  });

  const nextCallback = () => next(props, state);
  const prevCallback = () => prev(props, state);

  const methods: CarouselContextMethods = {
    next: nextCallback,
    prev: prevCallback,
    registerItem: () => registerItem(state),
  };

  effect(
    ([current]) => {
      if (current !== state.current && state.itemsCount > 0) {
        state.current = Math.min(Math.max(current, 0), state.itemsCount - 1);
      }
    },
    [() => props.current, () => props.disabled],
  );

  effect(
    () => {
      state.ariaLabel = getAriaLabel(props);
      state.ariaRoleDescription = getAriaRoleDescription(props);
      state.className = getClassName(props);
      state.isDisabled = getIsDisabled(props);
      state.nextAriaLabel = props.nextAriaLabel;
      state.prevAriaLabel = props.prevAriaLabel;
      state.role = getRole(props);
    },
    () => [
      props.ariaLabel,
      props.className,
      props.disabled,
      props.nextAriaLabel,
      props.prevAriaLabel,
    ],
  );

  effect(
    () => {
      state.transform = getTransform(state.current);
    },
    () => state.current,
  );

  return {
    id,
    state,
    getContext: () => getContext(state, methods),
    next: methods.next,
    prev: methods.prev,
    registerItem: methods.registerItem,
    onKeyDown: event => onKeyDown(props, state, event),
    useBeforeUnmount: () => useBeforeUnmount(uid),
  };
}
