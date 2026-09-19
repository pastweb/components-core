import type { FileUploaderDefaultProps } from '../types';

/**
 * Normalizes the FileUploader disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: FileUploaderDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}
