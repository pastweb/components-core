import { copyDate } from './date.utils';
import type { DateTimePickerDefaultProps, DateTimePickerState } from '../types';

/** Synchronizes renderer-ready calendar values derived from props and selection state. */
export function updateCalendarState(props: DateTimePickerDefaultProps, state: DateTimePickerState): void {
  state.weekdayNames = Array.from({ length: 7 }, (_, index) => state.locale.weekdays[(index + props.firstDayOfWeek) % 7]);
  state.selectedDate = copyDate(state.value[0] ?? new Date());
  state.minutes = Array.from({ length: Math.ceil(60 / props.minuteIncrement) }, (_, index) => index * props.minuteIncrement).filter(value => value < 60);
  const viewedYear = state.viewDate.getFullYear();
  const firstYear = props.minDate?.getFullYear() ?? viewedYear - 10;
  const lastYear = props.maxDate?.getFullYear() ?? viewedYear + 10;
  const from = Math.min(firstYear, lastYear);
  const to = Math.max(firstYear, lastYear);
  state.years = Array.from({ length: to - from + 1 }, (_, index) => from + index);
}
