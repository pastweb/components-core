import { createState, effect } from '@pastweb/tools';
import type { CarouselDefaultProps, CarouselMediator, CarouselState } from './types';

export function carousel(props: CarouselDefaultProps): CarouselMediator {
  const { state, setState } = createState<CarouselState>({ current: props.current });
  let interval: any = null;

  effect(props, (next, prev) => {
    if (next.current !== state.current) {
      setState({ current: props.current });
    }

    if (next.autoPlay) startAutoplay();
    else stopAutoplay();

    if (props.autoPlay && next.autoPlayInterval !== prev.autoPlayInterval) {
      stopAutoplay();
      startAutoplay();
    }
  });

  function next(): void {
    const { items } = props;
    setState({ current: (state.current + 1) % items.length });
  };

  function prev(): void {
    const { items } = props;
    setState({ current: (state.current - 1 + items.length) % items.length });
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

  return { state, next, prev };
}
