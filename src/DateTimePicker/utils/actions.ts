import type { DateTimePickerDefaultProps, DateTimePickerMediatorVars, DateTimePickerState } from '../types';
import { addDays, addMonths, copyDate, getMonthStart, sameDay } from './date.utils';
import { getCalendarDays } from './getCalendarDays';
import { getValue } from './getValue';
import { isDateDisabled } from './isDateDisabled';
import { startPositionUpdates } from './startPositionUpdates';
import { stopPositionUpdates } from './stopPositionUpdates';
import { updateCalendarState } from './updateCalendarState';
import { updatePosition } from './updatePosition';

export function updateDays(props: DateTimePickerDefaultProps, state: DateTimePickerState): void {
  state.days = getCalendarDays(props, state, date => isDateDisabled(props, date));
}

export function publish(
  props: DateTimePickerDefaultProps,
  state: DateTimePickerState,
  next: Date[],
  close = false,
): void {
  state.value = next.map(copyDate);
  if (props.mode === 'range' && state.value.length !== 1) state.hoverDate = null;
  updateCalendarState(props, state);
  updateDays(props, state);
  props.onChange?.(getValue(state.value, props.mode));
  if (close && !props.inline) closePicker(props, state);
}

export function selectDate(props: DateTimePickerDefaultProps, state: DateTimePickerState, date: Date): void {
  if (props.disabled || isDateDisabled(props, date)) return;
  const nextDate = copyDate(date);
  const currentTime = state.value[0] ?? new Date();
  nextDate.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);
  state.focusedDate = nextDate;

  if (props.mode === 'multiple') {
    const next = state.value.some(value => sameDay(value, nextDate))
      ? state.value.filter(value => !sameDay(value, nextDate))
      : [...state.value, nextDate];
    publish(props, state, next);
    return;
  }
  if (props.mode === 'range') {
    if (state.value.length !== 1) {
      state.hoverDate = null;
      publish(props, state, [nextDate]);
      return;
    }
    const [first] = state.value;
    publish(props, state, first <= nextDate ? [first, nextDate] : [nextDate, first], true);
    return;
  }
  publish(props, state, [nextDate], true);
}

export function closePicker(props: DateTimePickerDefaultProps, state: DateTimePickerState): void {
  if (props.inline) return;
  state.isTimePickerOpen = false;
  if (props.open === undefined) state.isOpen = false;
  props.onOpenChange?.(false);
}

export function toggle(props: DateTimePickerDefaultProps, state: DateTimePickerState): void {
  if (props.disabled || props.inline) return;
  const next = !state.isOpen;
  if (props.open === undefined) state.isOpen = next;
  if (!next) state.isTimePickerOpen = false;
  props.onOpenChange?.(next);
}

export function toggleTimePicker(props: DateTimePickerDefaultProps, state: DateTimePickerState, vars: DateTimePickerMediatorVars): void {
  if (!props.enableTime) return;
  const isClosing = state.isTimePickerOpen;
  state.isTimePickerOpen = !state.isTimePickerOpen;
  clearTimeout(vars.timeToggleFocusTimer);
  if (!isClosing) return;
  vars.timeToggleFocusTimer = setTimeout(focusTimeToggle, 0, state, vars);
}

/** Restores focus after the time-panel close state has rendered. */
export function focusTimeToggle(state: DateTimePickerState, vars: DateTimePickerMediatorVars): void {
  vars.timeToggleFocusTimer = undefined;
  if (state.isOpen && !state.isTimePickerOpen) vars.timeToggleReference?.focus();
}

export function navigate(props: DateTimePickerDefaultProps, state: DateTimePickerState, months: number): void {
  state.viewDate = addMonths(state.viewDate, months);
  updateCalendarState(props, state);
}

export function selectYear(props: DateTimePickerDefaultProps, state: DateTimePickerState, year: number): void {
  state.viewDate = new Date(year, state.viewDate.getMonth(), 1);
  updateCalendarState(props, state);
}

export function focusDate(props: DateTimePickerDefaultProps, state: DateTimePickerState, date: Date): void {
  state.focusedDate = copyDate(date);
  state.viewDate = getMonthStart(date);
  updateCalendarState(props, state);
}

export function setTime(props: DateTimePickerDefaultProps, state: DateTimePickerState, part: 'hour' | 'minute', value: number): void {
  const base = copyDate(state.value[0] ?? new Date());
  if (part === 'hour') base.setHours(value); else base.setMinutes(value);
  publish(props, state, props.mode === 'range' && state.value[1] ? [base, state.value[1]] : [base]);
}

export function onKeyDown(
  props: DateTimePickerDefaultProps,
  state: DateTimePickerState,
  event: { key: string; preventDefault?: () => void },
): void {
  const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
  if (event.key in moves) {
    event.preventDefault?.();
    focusDate(props, state, addDays(state.focusedDate, moves[event.key]));
    return;
  }
  if (event.key === 'PageUp') { event.preventDefault?.(); navigate(props, state, -1); return; }
  if (event.key === 'PageDown') { event.preventDefault?.(); navigate(props, state, 1); return; }
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault?.(); selectDate(props, state, state.focusedDate); return; }
  if (event.key === 'Escape') {
    if (state.isTimePickerOpen) state.isTimePickerOpen = false;
    else closePicker(props, state);
  }
}

export function setTriggerReference(props: DateTimePickerDefaultProps, state: DateTimePickerState, vars: DateTimePickerMediatorVars, element: HTMLElement | null): void {
  vars.triggerReference = element;
  if (state.isOpen && !props.inline) startPositionUpdates(vars);
}

export function setTimeToggleReference(vars: DateTimePickerMediatorVars, element: HTMLButtonElement | null): void {
  vars.timeToggleReference = element;
}

export function setCalendarReference(props: DateTimePickerDefaultProps, state: DateTimePickerState, vars: DateTimePickerMediatorVars, element: HTMLDivElement | null): void {
  vars.calendarReference = element;
  if (element && state.isOpen && !props.inline) startPositionUpdates(vars);
  if (!element) stopPositionUpdates(vars);
}

export function setHoverDate(props: DateTimePickerDefaultProps, state: DateTimePickerState, date: Date | null): void {
  if (props.mode !== 'range' || state.value.length !== 1 || !date || isDateDisabled(props, date)) {
    state.hoverDate = null;
    return;
  }
  state.hoverDate = copyDate(date);
}

export function onOutsideClick(props: DateTimePickerDefaultProps, state: DateTimePickerState, vars: DateTimePickerMediatorVars, event: MouseEvent): void {
  const target = event.target as Node;
  if (state.isOpen && !props.inline && !vars.triggerReference?.contains(target) && !vars.calendarReference?.contains(target)) {
    closePicker(props, state);
  }
}

export function useMounted(props: DateTimePickerDefaultProps, state: DateTimePickerState, vars: DateTimePickerMediatorVars): void {
  if (typeof document === 'undefined') return;
  vars.outsideClickListener = onOutsideClick.bind(null, props, state, vars);
  document.addEventListener('click', vars.outsideClickListener);
}

export function useBeforeUnmount(vars: DateTimePickerMediatorVars): void {
  stopPositionUpdates(vars);
  clearTimeout(vars.timeToggleFocusTimer);
  if (vars.outsideClickListener) document.removeEventListener('click', vars.outsideClickListener);
  vars.outsideClickListener = undefined;
  vars.timeToggleFocusTimer = undefined;
  vars.triggerReference = null;
  vars.timeToggleReference = null;
  vars.calendarReference = null;
}

export function syncOpenState(props: DateTimePickerDefaultProps, state: DateTimePickerState, vars: DateTimePickerMediatorVars): void {
  if (props.open !== undefined && !props.inline) state.isOpen = props.open;
  if (props.inline) state.isOpen = true;
  if (!state.isOpen) state.isTimePickerOpen = false;
  if (state.isOpen && !props.inline) updatePosition(vars);
  if (!state.isOpen) stopPositionUpdates(vars);
}

/** Starts or stops Floating UI observers as popup visibility changes. */
export function syncPositionUpdates(props: DateTimePickerDefaultProps, state: DateTimePickerState, vars: DateTimePickerMediatorVars): void {
  if (state.isOpen && !props.inline) startPositionUpdates(vars);
  if (!state.isOpen) stopPositionUpdates(vars);
}
