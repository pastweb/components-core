import { effect, reactive } from '@pastweb/tools';
import {
  calculatePages,
  clampPage,
  getAriaLabel,
  getIsDisabled,
  getIsNextDisabled,
  getIsPrevDisabled,
  normalizeTotal,
  onNext,
  onPageChange,
  onPrev,
  updateState,
} from './utils';
import type {
  PaginationDefaultProps,
  PaginationMediator,
  PaginationState,
} from './types';

export function paginationMediator(props: PaginationDefaultProps): PaginationMediator {
  const total = normalizeTotal(props.total);
  const current = clampPage(props.current, total);

  const state = reactive<PaginationState>({
    ariaLabel: getAriaLabel(props),
    current,
    isDisabled: getIsDisabled(props),
    isNextDisabled: getIsNextDisabled(props, current),
    isPrevDisabled: getIsPrevDisabled(props, current),
    pages: calculatePages(total, current),
  });

  effect(
    () => updateState(props, state),
    () => [props.current, props.total, props.disabled, props.ariaLabel],
  );

  return {
    onNext: () => onNext(props, state),
    onPageChange: page => onPageChange(props, state, page),
    onPrev: () => onPrev(props, state),
    state,
  };
}
