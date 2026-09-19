import type { CheckboxDefaultProps } from '../types';

/** Normalizes the disabled state for direct renderer use. */
export function getIsDisabled(props: CheckboxDefaultProps): true | undefined {
  return props.disabled || undefined;
}
