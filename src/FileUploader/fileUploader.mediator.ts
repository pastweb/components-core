import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import type {
  FileUploaderDefaultProps,
  FileUploaderMediator,
  FileUploaderMediatorVars,
  FileUploaderState,
} from './types';
import {
  getAriaLabel,
  getContext,
  getIsDisabled,
  onActivate as onActivateFileUploader,
  onChange as onChangeFileUploader,
  onDragEnter as onDragEnterFileUploader,
  onDragLeave as onDragLeaveFileUploader,
  onDragOver as onDragOverFileUploader,
  onDrop as onDropFileUploader,
  onKeyDown as onKeyDownFileUploader,
  removeFile as removeFileUploader,
  updateState,
  useBeforeUnmount as useBeforeUnmountFileUploader,
  useMounted as useMountedFileUploader,
} from './utils';

export function fileUploaderMediator(
  props: FileUploaderDefaultProps,
): FileUploaderMediator {
  const uid = idCache.getId('fileUploader');
  const id = props.id ? `_${props.id}` : uid;
  const inputId = `input${id}`;
  const labelId = `label${id}`;

  const vars: FileUploaderMediatorVars = {
    inputReference: undefined,
    formData: props.formData ?? new FormData(),
  };

  const state = reactive<FileUploaderState>({
    ariaLabel: undefined,
    canAddMore: true,
    fileCount: 0,
    files: [],
    isDisabled: undefined,
    isDragging: undefined,
  });

  updateState(props, state, vars);

  const removeFile = (fileName: string) => (
    removeFileUploader(props, state, vars, fileName)
  );

  effect(
    () => { state.ariaLabel = getAriaLabel(props); },
    () => [props.ariaLabel, props.label],
  );

  effect(
    () => { state.isDisabled = getIsDisabled(props); },
    () => props.disabled,
  );

  effect(
    () => updateState(props, state, vars),
    () => props.maxNumber,
  );

  return {
    getContext: () => getContext(props, state, vars, removeFile, id, inputId, labelId),
    id,
    inputId,
    labelId,
    onActivate: () => onActivateFileUploader(state, vars),
    onChange: event => onChangeFileUploader(props, state, vars, event),
    onDragEnter: event => onDragEnterFileUploader(props, state, event),
    onDragLeave: () => onDragLeaveFileUploader(state),
    onDragOver: event => onDragOverFileUploader(event),
    onDrop: event => onDropFileUploader(props, state, vars, event),
    onKeyDown: event => onKeyDownFileUploader(state, vars, event),
    removeFile,
    state,
    useBeforeUnmount: () => useBeforeUnmountFileUploader(uid, vars),
    useMounted: inputReference => useMountedFileUploader(vars, inputReference),
  };
}
