import type {
  ScrollAreaAlignment,
  ScrollAreaContentStyle,
  ScrollAreaDefaultProps,
} from './types';

/**
 * Normalizes the ScrollArea accessible name.
 *
 * An explicit empty `ariaLabel` omits the region name.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: ScrollAreaDefaultProps,
): string | undefined {
  return props.ariaLabel || undefined;
}

/**
 * Builds inline padding for the scroll viewport.
 *
 * An explicit `0` is preserved. Omitted padding emits no inline property.
 *
 * @example
 * ```ts
 * getContentStyle(props);
 * ```
 */
export function getContentStyle(
  props: ScrollAreaDefaultProps,
): ScrollAreaContentStyle {
  return props.contentPadding === undefined
    ? {}
    : { padding: props.contentPadding };
}

/**
 * Resolves initial semantic scroll alignment from overflow-end props.
 *
 * @example
 * ```ts
 * getScrollAlignment(props);
 * ```
 */
export function getScrollAlignment(
  props: ScrollAreaDefaultProps,
): ScrollAreaAlignment {
  return {
    horizontal: props.scrollRight ? 'end' : 'start',
    vertical: props.scrollBottom ? 'end' : 'start',
  };
}
