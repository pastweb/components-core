import type {
  FileUploaderContext,
  FileUploaderDefaultProps,
  FileUploaderMediatorVars,
  FileUploaderState,
} from '../types';

/**
 * Creates the live context exposed by a FileUploader mediator.
 *
 * @example
 * ```ts
 * getContext(props, state, vars, removeFile, id, inputId, labelId);
 * ```
 */
export function getContext(
  props: FileUploaderDefaultProps,
  state: FileUploaderState,
  vars: FileUploaderMediatorVars,
  removeFile: FileUploaderContext['removeFile'],
  id: string,
  inputId: string,
  labelId: string,
): FileUploaderContext {
  return {
    get accept() {
      return props.accept;
    },
    get canAddMore() {
      return state.canAddMore;
    },
    get dropzone() {
      return props.dropzone;
    },
    get fileCount() {
      return state.fileCount;
    },
    get files() {
      return state.files;
    },
    get formData() {
      return vars.formData;
    },
    get id() {
      return id;
    },
    get inputId() {
      return inputId;
    },
    get isDisabled() {
      return state.isDisabled;
    },
    get labelId() {
      return labelId;
    },
    get maxNumber() {
      return props.maxNumber;
    },
    get maxSize() {
      return props.maxSize;
    },
    get multiple() {
      return props.multiple;
    },
    removeFile,
  };
}
