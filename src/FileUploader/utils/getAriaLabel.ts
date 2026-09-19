import type { FileUploaderDefaultProps } from '../types';

/**
 * Normalizes the optional FileUploader accessible label.
 *
 * Visible `label` text names the control, so `ariaLabel` is omitted then.
 * An explicit empty `ariaLabel` also omits the accessible name.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: FileUploaderDefaultProps,
): string | undefined {
  if (props.label) return undefined;
  return props.ariaLabel || undefined;
}
