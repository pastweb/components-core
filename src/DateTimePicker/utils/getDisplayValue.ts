import { toFormValue } from './date.utils';
import type { DateTimePickerDefaultProps, DateTimePickerState } from '../types';

export function getDisplayValue(props: DateTimePickerDefaultProps, state: DateTimePickerState): string {
  return state.value.map(date => {
    const dateValue = props.formatDate?.(date) ?? toFormValue(date, false);
    if (!props.enableTime) return dateValue;
    return `${dateValue} - ${toFormValue(date, true).split('T')[1]}`;
  }).join(props.mode === 'range' ? ' – ' : ', ');
}
