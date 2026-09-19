import type { FileUploaderMediatorVars } from '../types';

/**
 * Reads the File values currently stored in the uploader FormData.
 *
 * @example
 * ```ts
 * getFiles(vars);
 * ```
 */
export function getFiles(vars: FileUploaderMediatorVars): File[] {
  return Array.from(vars.formData.values()).filter(
    (value): value is File => value instanceof File,
  );
}
