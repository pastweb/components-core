import type { DropDownMediatorVars } from '../types';

/**
 * Stores the mounted DropDown arrow reference.
 *
 * @example
 * ```ts
 * setArrowRef(vars, arrow);
 * ```
 */
export function setArrowRef(
  vars: DropDownMediatorVars,
  arrow?: HTMLElement | null,
): void {
  vars.arrowReference = arrow;
}
