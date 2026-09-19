import { matchesRule, startOfDay } from './date.utils';
import type { DateTimePickerDefaultProps } from '../types';

export function isDateDisabled(props: DateTimePickerDefaultProps, date: Date): boolean {
  if (props.minDate && startOfDay(date) < startOfDay(props.minDate)) return true;
  if (props.maxDate && startOfDay(date) > startOfDay(props.maxDate)) return true;
  if (props.disable?.some(rule => matchesRule(date, rule))) return true;
  return Boolean(props.enable?.length && !props.enable.some(rule => matchesRule(date, rule)));
}
