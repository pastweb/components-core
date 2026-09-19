import { describe, expect, it, vi } from 'vitest';
import { reactive } from '@pastweb/tools';
import { paginationMediator } from '../../src/Pagination';
import type { PaginationDefaultProps } from '../../src/Pagination';

function createProps(overrides: Partial<PaginationDefaultProps> = {}): PaginationDefaultProps {
  return {
    cls: (...values) => values.filter(Boolean).join(' '),
    total: 10,
    current: 1,
    ariaLabel: 'Pagination',
    disabled: false,
    onChange: vi.fn(),
    className: '',
    next: '►',
    prev: '◄',
    nextAriaLabel: 'Next page',
    prevAriaLabel: 'Previous page',
    pageAriaLabel: page => `Page ${page}`,
    jumpBackAriaLabel: 'Jump backward through pages',
    jumpForwardAriaLabel: 'Jump forward through pages',
    ...overrides,
  };
}

describe('paginationMediator', () => {
  it('given the default accessible name, when initialized, then ariaLabel is the default', () => {
    const mediator = paginationMediator(createProps());

    expect(mediator.state.ariaLabel).toBe('Pagination');
    expect(mediator.state.isDisabled).toBeUndefined();
    expect(mediator.state.isPrevDisabled).toBe(true);
    expect(mediator.state.isNextDisabled).toBeUndefined();
  });

  it('given an explicit empty ariaLabel, when initialized, then the accessible name is omitted', () => {
    const mediator = paginationMediator(createProps({ ariaLabel: '' }));

    expect(mediator.state.ariaLabel).toBeUndefined();
  });

  it('given the first page, when previous is requested, then it remains in range', () => {
    const onChange = vi.fn();
    const mediator = paginationMediator(createProps({ current: 1, onChange }));

    mediator.onPrev();

    expect(mediator.state.current).toBe(1);
    expect(mediator.state.isPrevDisabled).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('given the last page, when next is requested, then it remains in range', () => {
    const onChange = vi.fn();
    const mediator = paginationMediator(createProps({ current: 10, onChange }));

    mediator.onNext();

    expect(mediator.state.current).toBe(10);
    expect(mediator.state.isNextDisabled).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('given forward ellipsis, when activated, then it jumps to a valid later page', () => {
    const onChange = vi.fn();
    const mediator = paginationMediator(createProps({ current: 1, onChange }));

    mediator.onPageChange('...');

    expect(mediator.state.current).toBe(5);
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('given a disabled pagination, when navigation is requested, then it does not change', () => {
    const onChange = vi.fn();
    const mediator = paginationMediator(createProps({ disabled: true, current: 2, onChange }));

    mediator.onNext();
    mediator.onPageChange(5);

    expect(mediator.state.current).toBe(2);
    expect(mediator.state.isDisabled).toBe(true);
    expect(mediator.state.isPrevDisabled).toBe(true);
    expect(mediator.state.isNextDisabled).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('given an out-of-range current page, when initialized, then it is clamped', () => {
    const mediator = paginationMediator(createProps({ total: 3, current: 99 }));

    expect(mediator.state.current).toBe(3);
    expect(mediator.state.pages).toEqual([1, 2, 3]);
  });

  it('given pagination props change, when effects run, then state exposes current values', async () => {
    const props = reactive(createProps({ current: 2 }));
    const mediator = paginationMediator(props);

    props.ariaLabel = '';
    props.disabled = true;
    props.current = 4;

    await vi.waitFor(() => {
      expect(mediator.state.ariaLabel).toBeUndefined();
      expect(mediator.state.isDisabled).toBe(true);
      expect(mediator.state.current).toBe(4);
    });
  });
});
