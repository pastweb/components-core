import { addDays, addMonths, getMonthStart, isBetween, sameDay } from './date.utils';
import type { CalendarDay, DateTimePickerDefaultProps, DateTimePickerState } from '../types';

export function getCalendarDays(props: DateTimePickerDefaultProps, state: DateTimePickerState, isDisabled: (date: Date) => boolean, monthOffset = 0): CalendarDay[] {
  const month = addMonths(state.viewDate, monthOffset);
  const first = getMonthStart(month);
  const leadingDays = (first.getDay() - props.firstDayOfWeek + 7) % 7;
  const rangeValues = props.mode === 'range' ? state.value : [];
  const rangeStart = rangeValues[0];
  const rangeEnd = rangeValues[1] ?? state.hoverDate ?? undefined;
  const firstRangeDate = rangeStart && rangeEnd && rangeStart <= rangeEnd ? rangeStart : rangeEnd;
  const lastRangeDate = rangeStart && rangeEnd && rangeStart <= rangeEnd ? rangeEnd : rangeStart;
  const workingWeekDays = Math.min(7, Math.max(1, props.workingWeekDays));
  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(first, index - leadingDays);
    const weekday = date.getDay();
    const workdayIndex = weekday === 0 ? 7 : weekday;
    return {
      date,
      isCurrentMonth: date.getMonth() === month.getMonth(),
      isDisabled: isDisabled(date),
      isSelected: state.value.some(value => sameDay(value, date)),
      isRangeStart: props.mode === 'range' && Boolean(firstRangeDate && sameDay(firstRangeDate, date)),
      isRangeEnd: props.mode === 'range' && Boolean(lastRangeDate && sameDay(lastRangeDate, date)),
      isInRange: props.mode === 'range' && Boolean(firstRangeDate && lastRangeDate && isBetween(date, firstRangeDate, lastRangeDate)),
      isToday: sameDay(date, new Date()),
      isSaturday: weekday === 6,
      isSunday: weekday === 0,
      isFreeDay: workdayIndex > workingWeekDays,
      isHoliday: Boolean(props.holidaysDates?.some(holiday => sameDay(holiday, date))),
    };
  });
}
