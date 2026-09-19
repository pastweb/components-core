import { idCache } from '../../utils';

/**
 * Releases resources owned by a Carousel mediator.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
