import { copyDate } from './date.utils';
import type { DateTimePickerMode, DateTimePickerValue } from '../types';

/** Converts the mediator's normalized array into the public value shape. */
export function getValue(value: Date[], mode: DateTimePickerMode): DateTimePickerValue {
  if (!value.length) return null;
  return mode === 'single' ? copyDate(value[0]) : value.map(copyDate);
}
