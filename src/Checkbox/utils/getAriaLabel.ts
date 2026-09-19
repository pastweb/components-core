import type { CheckboxDefaultProps } from '../types';

/** Returns an accessible label only when visible label content is absent. */
export function getAriaLabel(props: CheckboxDefaultProps): string | undefined {
  if (props.label) return undefined;
  return props.ariaLabel || undefined;
}
