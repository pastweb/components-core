import type { DropDownMediatorVars } from '../types';

/**
 * Stores the mounted DropDown trigger reference.
 *
 * @example
 * ```ts
 * registerTarget(vars, target);
 * ```
 */
export function registerTarget(vars: DropDownMediatorVars, target: HTMLElement): void {
  vars.targetReference = target;
}
