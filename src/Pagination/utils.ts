import { DOTS_INITIAL, DOTS_LEFT, DOTS_RIGHT } from './constants';
import type {
  PaginationDefaultProps,
  PaginationItem,
  PaginationState,
} from './types';

/**
 * Floors the page count and clamps it to zero or greater.
 *
 * @example
 * ```ts
 * normalizeTotal(-2.8);
 * ```
 */
export function normalizeTotal(total: number): number {
  return Math.max(0, Math.floor(total));
}

/**
 * Floors a page number and clamps it to the available one-based range.
 *
 * @example
 * ```ts
 * clampPage(99, 3);
 * ```
 */
export function clampPage(page: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(Math.max(Math.floor(page), 1), total);
}

/**
 * Builds the visible page and jump-control sequence for the current range.
 *
 * @example
 * ```ts
 * calculatePages(10, 1);
 * ```
 */
export function calculatePages(total: number, current: number): PaginationItem[] {
  if (total < 8) return Array.from({ length: total }, (_, index) => index + 1);
  if (current <= 3) return [1, 2, 3, 4, DOTS_INITIAL, total];
  if (current === 4) return [1, 2, 3, 4, 5, DOTS_INITIAL, total];
  if (current < total - 2) {
    return [1, DOTS_LEFT, current - 1, current, current + 1, DOTS_RIGHT, total];
  }

  return [1, DOTS_LEFT, total - 3, total - 2, total - 1, total];
}

/**
 * Normalizes the Pagination accessible name.
 *
 * An explicit empty `ariaLabel` omits the navigation name.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: PaginationDefaultProps,
): string | undefined {
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the Pagination disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: PaginationDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}

/**
 * Normalizes previous-page unavailability.
 *
 * @example
 * ```ts
 * getIsPrevDisabled(props, 1);
 * ```
 */
export function getIsPrevDisabled(
  props: PaginationDefaultProps,
  current: number,
): true | undefined {
  return props.disabled || current <= 1 || undefined;
}

/**
 * Normalizes next-page unavailability.
 *
 * @example
 * ```ts
 * getIsNextDisabled(props, 10);
 * ```
 */
export function getIsNextDisabled(
  props: PaginationDefaultProps,
  current: number,
): true | undefined {
  const total = normalizeTotal(props.total);
  return props.disabled || current === 0 || current >= total || undefined;
}

/**
 * Synchronizes Pagination state from the current props and page.
 *
 * @example
 * ```ts
 * updateState(props, state);
 * ```
 */
export function updateState(
  props: PaginationDefaultProps,
  state: PaginationState,
): void {
  const total = normalizeTotal(props.total);
  state.current = clampPage(props.current, total);
  state.pages = calculatePages(total, state.current);
  state.ariaLabel = getAriaLabel(props);
  state.isDisabled = getIsDisabled(props);
  state.isPrevDisabled = getIsPrevDisabled(props, state.current);
  state.isNextDisabled = getIsNextDisabled(props, state.current);
}

/**
 * Moves to a valid page and reports the change when the control is available.
 *
 * @example
 * ```ts
 * setCurrent(props, state, 2);
 * ```
 */
export function setCurrent(
  props: PaginationDefaultProps,
  state: PaginationState,
  page: number,
): void {
  if (getIsDisabled(props)) return;
  const nextTotal = normalizeTotal(props.total);
  const nextPage = clampPage(page, nextTotal);
  if (nextPage === 0 || nextPage === state.current) return;
  state.current = nextPage;
  state.pages = calculatePages(nextTotal, nextPage);
  state.isPrevDisabled = getIsPrevDisabled(props, nextPage);
  state.isNextDisabled = getIsNextDisabled(props, nextPage);
  props.onChange(nextPage);
}

/**
 * Activates a numbered page or ellipsis jump control.
 *
 * @example
 * ```ts
 * onPageChange(props, state, 5);
 * ```
 */
export function onPageChange(
  props: PaginationDefaultProps,
  state: PaginationState,
  item: PaginationItem,
): void {
  if (typeof item === 'number') {
    setCurrent(props, state, item);
    return;
  }

  if (item === DOTS_INITIAL) setCurrent(props, state, 5);
  if (item === DOTS_LEFT) setCurrent(props, state, state.current - 3);
  if (item === DOTS_RIGHT) setCurrent(props, state, state.current + 3);
}

/**
 * Moves to the previous valid page.
 *
 * @example
 * ```ts
 * onPrev(props, state);
 * ```
 */
export function onPrev(
  props: PaginationDefaultProps,
  state: PaginationState,
): void {
  setCurrent(props, state, state.current - 1);
}

/**
 * Moves to the next valid page.
 *
 * @example
 * ```ts
 * onNext(props, state);
 * ```
 */
export function onNext(
  props: PaginationDefaultProps,
  state: PaginationState,
): void {
  setCurrent(props, state, state.current + 1);
}
