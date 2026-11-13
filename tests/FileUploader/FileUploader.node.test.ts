import { describe, expect, it, vi } from 'vitest';
import { fileUploaderMediator } from '../../src/FileUploader';
import type { FileUploaderDefaultProps } from '../../src/FileUploader';

function createProps(overrides: Partial<FileUploaderDefaultProps> = {}): FileUploaderDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    ariaLabel: 'Upload a file',
    className: '',
    disabled: false,
    dropzone: false,
    label: '',
    maxNumber: 1,
    multiple: false,
    onAddFile: vi.fn(),
    tabIndex: 0,
    ...overrides,
  };
}

describe('fileUploaderMediator', () => {
  it('given a native target event, when a file is selected, then it stores the file', () => {
    const mediator = fileUploaderMediator(createProps());
    const file = new File(['content'], 'report.txt', { type: 'text/plain' });

    const reportedFiles = mediator.onChange({ target: { files: [file] } } as unknown as Event);

    expect(reportedFiles).toEqual([file]);
    expect(mediator.state.files).toEqual([file]);
    mediator.useBeforeUnmount();
  });

  it('given a currentTarget event, when a file is selected, then it stores the file', () => {
    const mediator = fileUploaderMediator(createProps());
    const file = new File(['content'], 'report.txt', { type: 'text/plain' });

    const reportedFiles = mediator.onChange({ currentTarget: { files: [file] } } as unknown as Event);

    expect(reportedFiles).toEqual([file]);
    expect(mediator.state.files).toEqual([file]);
    mediator.useBeforeUnmount();
  });
});
