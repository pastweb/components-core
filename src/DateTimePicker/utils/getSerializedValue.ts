import { toFormValue } from './date.utils';
import type { DateTimePickerDefaultProps, DateTimePickerState } from '../types';

export function getSerializedValue(props: DateTimePickerDefaultProps, state: DateTimePickerState): string {
  return state.value.map(date => toFormValue(date, props.enableTime)).join(',');
}
