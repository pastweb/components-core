import { noop } from '@pastweb/tools';
import type { FileUploaderDefaultProps } from './types';

export const FILE_UPLOADER_CONTEXT_KEY = '$$FileUploaderContext';

export const SIZE_BASE = 1024;

export const SIZE_UNITS = [
  'Bytes',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB',
] as const;

export const DEFAULT_PROPS = {
  ariaLabel: 'Upload a file',
  className: '',
  disabled: false,
  dropzone: false,
  label: '',
  maxNumber: 1,
  multiple: false,
  onAddFile: noop,
  tabIndex: 0,
} satisfies Partial<FileUploaderDefaultProps>;
