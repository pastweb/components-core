import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownState,
} from '../types';
import { addEventListeners } from './addEventListeners';
import { registerContent } from './registerContent';
import { registerTarget } from './registerTarget';
import { updatePosition } from './updatePosition';

/**
 * Stores the mounted DropDown references and starts activation listeners.
 *
 * @example
 * ```ts
 * useMounted(props, state, vars, root, target, container, content);
 * ```
 */
export function useMounted(
  props: DropDownDefaultProps,
  state: DropDownState,
  vars: DropDownMediatorVars,
  root: HTMLElement,
  target: HTMLElement,
  container: HTMLElement,
  content: HTMLElement,
): void {
  vars.rootReference = root;
  registerTarget(vars, target);
  registerContent(vars, container, content);
  addEventListeners(props, state, vars);
  updatePosition(props, vars);
}
