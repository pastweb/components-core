import type {
  DropDownContext,
  DropDownContextMethods,
  DropDownDefaultProps,
  DropDownState,
} from '../types';

/**
 * Creates the live context exposed by a DropDown mediator.
 *
 * @example
 * ```ts
 * getContext(props, state, methods, id);
 * ```
 */
export function getContext(
  props: DropDownDefaultProps,
  state: DropDownState,
  methods: DropDownContextMethods,
  id: string,
): DropDownContext {
  return {
    get ariaLabel() {
      return state.ariaLabel;
    },
    get id() {
      return id;
    },
    get arrow() {
      return props.arrow;
    },
    get cls() {
      return props.cls;
    },
    get contentClassName() {
      return props.contentClassName;
    },
    get contentId() {
      return state.contentId;
    },
    get isDisabled() {
      return state.isDisabled;
    },
    get isVisible() {
      return state.isVisible;
    },
    get position() {
      return props.position;
    },
    get triggerId() {
      return state.triggerId;
    },
    ...methods,
  };
}
