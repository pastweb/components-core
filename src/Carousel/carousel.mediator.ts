import { reactive, effect } from '@pastweb/tools';
import type { CarouselDefaultProps, CarouselMediator, CarouselState } from './types';

export function carouselMediator(props: CarouselDefaultProps): CarouselMediator {
  const state = reactive<CarouselState>({ current: props.current });
  let interval: any = null;
  let itemsCounter = 0;

  effect(([current, autoPlay, autoPlayInterval], [, , prevAutoPlayInterval]) => {
    if (current !== state.current) {
      state.current = props.current;
    }

    if (autoPlay) startAutoplay();
    else stopAutoplay();

    if (autoPlay && autoPlayInterval !== prevAutoPlayInterval) {
      stopAutoplay();
      startAutoplay();
    }
  }, [
    () => props.current,
    () => props.autoPlay,
    () => props.autoPlayInterval,
  ]);

  const registerItem = () => itemsCounter++;

  function next(): void {
    const step = state.current + 1;
    state.current = step < itemsCounter ? step : 0;
  };

  function prev(): void {
    const step = state.current - 1;
    state.current = step >= 0 ? step : itemsCounter - 1;
  };

  function startAutoplay(): void {
    if (!props.autoPlay) return;
    interval = setInterval(next, props.autoPlayInterval);
  };

  startAutoplay();

  function stopAutoplay(): void {
    if (!interval) return;
    clearInterval(interval);
  };

  return { state, next, prev, registerItem };
}
