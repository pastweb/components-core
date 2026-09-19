import type { DateRule, DateTimePickerValue } from '../types';

export function copyDate(date: Date): Date {
  return new Date(date.getTime());
}

export function startOfDay(date: Date): Date {
  const result = copyDate(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function sameDay(left: Date, right: Date): boolean {
  return startOfDay(left).getTime() === startOfDay(right).getTime();
}

export function isBetween(date: Date, from: Date, to: Date): boolean {
  const value = startOfDay(date).getTime();
  return value >= startOfDay(from).getTime() && value <= startOfDay(to).getTime();
}

export function normalizeValue(value?: DateTimePickerValue): Date[] {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).filter(date => date instanceof Date && !Number.isNaN(date.getTime())).map(copyDate);
}

export function matchesRule(date: Date, rule: DateRule): boolean {
  if (rule instanceof Date) return sameDay(date, rule);
  if (typeof rule === 'function') return rule(copyDate(date));
  return isBetween(date, rule.from, rule.to);
}

export function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function addDays(date: Date, amount: number): Date {
  const result = copyDate(date);
  result.setDate(result.getDate() + amount);
  return result;
}

export function toFormValue(date: Date, withTime: boolean): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  const datePart = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return withTime ? `${datePart}T${pad(date.getHours())}:${pad(date.getMinutes())}` : datePart;
}
