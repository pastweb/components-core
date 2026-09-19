import type { DropDownMediatorVars } from '../types';

/**
 * Stores the mounted DropDown content references.
 *
 * @example
 * ```ts
 * registerContent(vars, container, content, arrow);
 * ```
 */
export function registerContent(
  vars: DropDownMediatorVars,
  container: HTMLElement,
  content: HTMLElement,
  arrow?: HTMLElement | null,
): void {
  vars.containerReference = container;
  vars.contentReference = content;
  vars.arrowReference = arrow;
}
