import type { SelectContext, SelectContextMethods, SelectState } from '../types';

/**
 * Creates the live context exposed by a Select mediator.
 *
 * @example
 * ```ts
 * getContext(state, methods);
 * ```
 */
export function getContext(
  state: SelectState,
  methods: SelectContextMethods,
): SelectContext {
  return {
    get state() {
      return state;
    },
    ...methods,
  };
}
