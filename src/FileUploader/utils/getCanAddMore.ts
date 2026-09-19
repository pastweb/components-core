import type {
  FileUploaderDefaultProps,
  FileUploaderMediatorVars,
} from '../types';

/**
 * Reports whether another file can be stored under `maxNumber`.
 *
 * @example
 * ```ts
 * getCanAddMore(props, vars);
 * ```
 */
export function getCanAddMore(
  props: FileUploaderDefaultProps,
  vars: FileUploaderMediatorVars,
): boolean {
  return Array.from(vars.formData.keys()).length < props.maxNumber;
}
