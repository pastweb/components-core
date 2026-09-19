import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export type DateTimePickerMode = 'single' | 'multiple' | 'range';
export type DateTimePickerValue = Date | Date[] | null;
export type DateRule = Date | { from: Date; to: Date } | ((date: Date) => boolean);

export interface DateTimePickerLocale {
  months: string[];
  weekdays: string[];
  previousMonth: string;
  nextMonth: string;
  clear: string;
  today: string;
  hour: string;
  minute: string;
}

export interface DateTimePickerProps {
  cls: (...args: ClassValue[]) => string;
  value?: DateTimePickerValue;
  defaultValue?: DateTimePickerValue;
  mode?: DateTimePickerMode;
  open?: boolean;
  inline?: boolean;
  disabled?: boolean;
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
  previousMonthAriaLabel?: string;
  nextMonthAriaLabel?: string;
  yearSelectAriaLabel?: string;
  selectTimeAriaLabel?: string;
  backToCalendarAriaLabel?: string;
  prevMonth?: string;
  nextMonth?: string;
  label?: string;
  labelPlacement?: Placement;
  name?: string;
  className?: string;
  enableTime?: boolean;
  noCalendar?: boolean;
  time24hr?: boolean;
  minuteIncrement?: number;
  minDate?: Date;
  maxDate?: Date;
  minTime?: string;
  maxTime?: string;
  disable?: DateRule[];
  enable?: DateRule[];
  showMonths?: number;
  weekNumbers?: boolean;
  yearSelect?: boolean;
  firstDayOfWeek?: number;
  workingWeekDays?: number;
  holidaysDates?: Date[];
  locale?: Partial<DateTimePickerLocale>;
  formatDate?: (date: Date) => string;
  getDayClassName?: (date: Date) => ClassValue | undefined;
  onChange?: (value: DateTimePickerValue) => void;
  onOpenChange?: (open: boolean) => void;
}

export interface DateTimePickerDefaultProps extends DateTimePickerProps {
  mode: DateTimePickerMode;
  inline: boolean;
  disabled: boolean;
  id?: string;
  placeholder: string;
  ariaLabel: string;
  previousMonthAriaLabel: string;
  nextMonthAriaLabel: string;
  yearSelectAriaLabel: string;
  selectTimeAriaLabel: string;
  backToCalendarAriaLabel: string;
  prevMonth: string;
  nextMonth: string;
  label: string;
  labelPlacement: Placement;
  className: string;
  enableTime: boolean;
  noCalendar: boolean;
  time24hr: boolean;
  minuteIncrement: number;
  showMonths: number;
  weekNumbers: boolean;
  yearSelect: boolean;
  firstDayOfWeek: number;
  workingWeekDays: number;
  locale: Partial<DateTimePickerLocale>;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isToday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  isFreeDay: boolean;
  isHoliday: boolean;
}

export interface DateTimePickerState {
  isOpen: boolean;
  isTimePickerOpen: boolean;
  inputId: string;
  labelId: string;
  value: Date[];
  viewDate: Date;
  focusedDate: Date;
  hoverDate: Date | null;
  locale: DateTimePickerLocale;
  weekdayNames: string[];
  days: CalendarDay[];
  years: number[];
  selectedDate: Date;
  triggerId: string;
  minutes: number[];
}

export interface DateTimePickerMediator {
  state: DateTimePickerState;
  displayValue: () => string;
  serializedValue: () => string;
  monthLabel: (monthOffset?: number) => string;
  clear: () => void;
  close: () => void;
  focusDate: (date: Date) => void;
  isDateDisabled: (date: Date) => boolean;
  navigate: (months: number) => void;
  selectYear: (year: number) => void;
  onKeyDown: (event: { key: string; preventDefault?: () => void }) => void;
  selectDate: (date: Date) => void;
  setTime: (part: 'hour' | 'minute', value: number) => void;
  toggleTimePicker: () => void;
  setCalendarReference: (element: HTMLDivElement | null) => void;
  setHoverDate: (date: Date | null) => void;
  setTimeToggleReference: (element: HTMLButtonElement | null) => void;
  setTriggerReference: (element: HTMLElement | null) => void;
  toggle: () => void;
  useBeforeUnmount: () => void;
  useMounted: () => void;
}

export interface DateTimePickerMediatorVars {
  triggerReference: HTMLElement | null;
  timeToggleReference: HTMLButtonElement | null;
  calendarReference: HTMLDivElement | null;
  stopPositionUpdates?: () => void;
  outsideClickListener?: (event: MouseEvent) => void;
  timeToggleFocusTimer?: ReturnType<typeof setTimeout>;
}
