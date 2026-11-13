import type { ClassValue } from '@pastweb/tools';

export interface FileUploaderProps {
  cls: (...args: ClassValue[]) => string;
  accept?: string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  dropzone?: boolean;
  formData?: FormData;
  id?: string;
  label?: string;
  maxNumber?: number;
  maxSize?: number;
  multiple?: boolean;
  name?: string;
  tabIndex?: number;
  onAddFile?: (file: File, data: FormData) => void;
}

export interface FileUploaderDefaultProps {
  cls: (...args: ClassValue[]) => string;
  accept?: string;
  ariaLabel: string;
  className: string;
  disabled: boolean;
  dropzone: boolean;
  formData?: FormData;
  id?: string;
  label: string;
  maxNumber: number;
  maxSize?: number;
  multiple: boolean;
  name?: string;
  tabIndex: number;
  onAddFile: (file: File, data: FormData) => void;
}

export interface FileUploaderState {
  ariaLabel: string | undefined;
  canAddMore: boolean;
  fileCount: number;
  files: File[];
  isDisabled: true | undefined;
  isDragging: true | undefined;
}

export interface FileUploaderInputReference {
  click: () => void;
  value: string;
}

export interface FileUploaderMediatorVars {
  inputReference: FileUploaderInputReference | undefined;
  formData: FormData;
}

export interface FileUploaderKeyEvent {
  key: string;
  preventDefault?: () => void;
}

export interface FileUploaderDragEvent {
  preventDefault?: () => void;
  stopPropagation?: () => void;
  dataTransfer?: { files?: ArrayLike<File> | null } | null;
}

export interface FileUploaderChangeEvent {
  target?: EventTarget | null;
  currentTarget?: EventTarget | null;
}

export interface FileUploaderContext {
  readonly accept: string | undefined;
  readonly canAddMore: boolean;
  readonly dropzone: boolean;
  readonly fileCount: number;
  readonly files: File[];
  readonly formData: FormData;
  readonly id: string;
  readonly inputId: string;
  readonly isDisabled: true | undefined;
  readonly labelId: string;
  readonly maxNumber: number;
  readonly maxSize: number | undefined;
  readonly multiple: boolean;
  removeFile: (fileName: string) => void;
}

export interface FileUploaderMediator {
  getContext: () => FileUploaderContext;
  id: string;
  inputId: string;
  labelId: string;
  onActivate: () => void;
  onChange: (event: FileUploaderChangeEvent) => File[];
  onDragEnter: (event: FileUploaderDragEvent) => void;
  onDragLeave: () => void;
  onDragOver: (event: FileUploaderDragEvent) => void;
  onDrop: (event: FileUploaderDragEvent) => File[];
  onKeyDown: (event: FileUploaderKeyEvent) => void;
  removeFile: (fileName: string) => void;
  state: FileUploaderState;
  useBeforeUnmount: () => void;
  useMounted: (inputReference: FileUploaderInputReference) => void;
}
