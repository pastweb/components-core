import type { DateTimePickerDefaultProps, DateTimePickerLocale } from './types';

export const DATETIME_PICKER_TRIGGER_PROPS_CONTEXT_KEY = '$$DateTimePickerTriggerProps';

export const DEFAULT_LOCALE: DateTimePickerLocale = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  clear: 'Clear',
  today: 'Today',
  hour: 'Hour',
  minute: 'Minute',
};

export const DEFAULT_PROPS: Partial<DateTimePickerDefaultProps> = {
  mode: 'single',
  placeholder: 'Select date',
  ariaLabel: 'Select date',
  previousMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  yearSelectAriaLabel: 'Select year',
  selectTimeAriaLabel: 'Select time',
  backToCalendarAriaLabel: 'Back to calendar',
  prevMonth: '◀',
  nextMonth: '▶',
  labelPlacement: 'top-start' as const,
  label: '',
  className: '',
  time24hr: true,
  minuteIncrement: 5,
  showMonths: 1,
  firstDayOfWeek: 1,
  workingWeekDays: 5,
  locale: {},
};
