import { addMonths } from './date.utils';
import type { DateTimePickerState } from '../types';

export function getMonthLabel(state: DateTimePickerState, offset = 0): string {
  const month = addMonths(state.viewDate, offset);
  return `${state.locale.months[month.getMonth()]} ${month.getFullYear()}`;
}
