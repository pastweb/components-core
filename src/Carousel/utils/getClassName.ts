import type { CarouselDefaultProps } from '../types';
import { getIsDisabled } from './getIsDisabled';

/**
 * Resolves the complete root class name for a Carousel.
 *
 * @example
 * ```ts
 * getClassName(props);
 * ```
 */
export function getClassName(props: CarouselDefaultProps): string {
  return props.cls(
    'Carousel',
    props.className,
    getIsDisabled(props) && 'is-disabled',
  );
}
