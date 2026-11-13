import type { CarouselDefaultProps } from './types';

export const CAROUSEL_CONTEXT_KEY = '$$CarouselContext';

export const DEFAULT_PROPS: Partial<CarouselDefaultProps> = {
  ariaLabel: 'Carousel',
  className: '',
  showCommands: true,
  current: 0,
  prevAriaLabel: 'Previous slide',
  nextAriaLabel: 'Next slide',
};
