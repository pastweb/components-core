import type {
  FileUploaderDefaultProps,
  FileUploaderMediatorVars,
  FileUploaderState,
} from '../types';
import { updateState } from './updateState';

/**
 * Stores selected files in FormData until `maxNumber` is reached.
 *
 * Files over `maxSize` are reported through `onAddFile` without being stored.
 * A file whose name is already present replaces the previous value.
 *
 * @example
 * ```ts
 * addFiles(props, state, vars, files);
 * ```
 */
export function addFiles(
  props: FileUploaderDefaultProps,
  state: FileUploaderState,
  vars: FileUploaderMediatorVars,
  files: File[],
): File[] {
  if (state.isDisabled) return [];

  const data = vars.formData;
  const reportedFiles: File[] = [];

  for (const file of files) {
    if (Array.from(data.keys()).length >= props.maxNumber) break;

    if (props.maxSize && file.size > props.maxSize) {
      props.onAddFile(file, data);
      reportedFiles.push(file);
      continue;
    }

    if (!data.has(file.name)) {
      data.append(file.name, file);
    } else {
      data.set(file.name, file);
    }

    props.onAddFile(file, data);
    reportedFiles.push(file);
  }

  if (vars.inputReference) vars.inputReference.value = '';
  updateState(props, state, vars);

  return reportedFiles;
}
