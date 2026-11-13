import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import { DEFAULT_LOCALE } from './constants';
import { getMonthStart, normalizeValue } from './utils/date.utils';
import {
  closePicker,
  focusDate,
  getDisplayValue,
  getMonthLabel,
  getSerializedValue,
  isDateDisabled,
  navigate,
  onKeyDown,
  publish,
  selectDate,
  selectYear,
  setHoverDate,
  setTime,
  syncOpenState,
  syncPositionUpdates,
  toggle,
  toggleTimePicker,
  updateCalendarState,
  updateDays,
  useBeforeUnmount,
  useMounted,
} from './utils';
import type { DateTimePickerDefaultProps, DateTimePickerMediator, DateTimePickerMediatorVars, DateTimePickerState } from './types';

/** Composes DateTimePicker state, derived values, and static interaction helpers. */
export function dateTimePickerMediator(props: DateTimePickerDefaultProps): DateTimePickerMediator {
  const uid = idCache.getId('dateTimePicker');
  const id = props.id ? `_${props.id}` : uid;
  const vars: DateTimePickerMediatorVars = {
    triggerReference: null,
    timeToggleReference: null,
    calendarReference: null,
  };
  const initialValue = normalizeValue(props.value ?? props.defaultValue);
  const state = reactive<DateTimePickerState>({
    isOpen: props.inline || (props.open ?? false),
    isTimePickerOpen: props.noCalendar,
    inputId: id,
    labelId: `${id}-label`,
    value: initialValue,
    viewDate: getMonthStart(initialValue[0] ?? new Date()),
    focusedDate: initialValue[0] ?? new Date(),
    hoverDate: null,
    locale: { ...DEFAULT_LOCALE, ...props.locale },
    weekdayNames: [],
    days: [],
    years: [],
    selectedDate: initialValue[0] ?? new Date(),
    triggerId: `${id}-trigger`,
    minutes: [],
  });

  updateCalendarState(props, state);
  updateDays(props, state);

  effect(
    () => {
      if (props.value !== undefined) state.value = normalizeValue(props.value);
      state.locale = { ...DEFAULT_LOCALE, ...props.locale };
      updateCalendarState(props, state);
      syncOpenState(props, state, vars);
    },
    () => [props.value, props.open, props.inline, props.locale, props.firstDayOfWeek, props.minuteIncrement, props.minDate, props.maxDate],
  );

  effect(
    () => updateDays(props, state),
    () => [props.mode, props.firstDayOfWeek, props.workingWeekDays, props.holidaysDates, props.minDate, props.maxDate, props.disable, props.enable, state.value, state.viewDate, state.hoverDate],
  );

  effect(
    () => {
      if (props.noCalendar && state.isOpen) state.isTimePickerOpen = true;
    },
    () => [props.noCalendar, state.isOpen],
  );

  effect(
    () => syncPositionUpdates(props, state, vars),
    () => [state.isOpen, props.inline],
  );

  return {
    state,
    displayValue: () => getDisplayValue(props, state),
    serializedValue: () => getSerializedValue(props, state),
    monthLabel: offset => getMonthLabel(state, offset),
    clear: () => publish(props, state, []),
    close: () => closePicker(props, state),
    focusDate: date => focusDate(props, state, date),
    isDateDisabled: date => isDateDisabled(props, date),
    navigate: months => navigate(props, state, months),
    onKeyDown: event => onKeyDown(props, state, event),
    selectDate: date => selectDate(props, state, date),
    setTime: (part, value) => setTime(props, state, part, value),
    setHoverDate: date => setHoverDate(props, state, date),
    toggle: () => toggle(props, state),
    toggleTimePicker: () => toggleTimePicker(props, state, vars),
    selectYear: year => selectYear(props, state, year),
    useBeforeUnmount: () => {
      useBeforeUnmount(vars);
      idCache.removeId(uid);
    },
    useMounted: (triggerReference, calendarReference, timeToggleReference) => {
      vars.triggerReference = triggerReference;
      vars.calendarReference = calendarReference;
      vars.timeToggleReference = timeToggleReference;
      syncPositionUpdates(props, state, vars);
      useMounted(props, state, vars);
    },
  };
}
