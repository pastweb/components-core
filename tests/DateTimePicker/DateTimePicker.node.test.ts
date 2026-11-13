import { afterEach, describe, expect, it, vi } from 'vitest';
import { reactive, type ClassValue } from '@pastweb/tools';
import { dateTimePickerMediator } from '../../src/DateTimePicker';
import type { DateTimePickerDefaultProps } from '../../src/DateTimePicker';

const cls = (...values: ClassValue[]): string => values
  .flatMap(value => typeof value === 'string' ? [value] : [])
  .join(' ');

function createProps(
  overrides: Partial<DateTimePickerDefaultProps> = {},
): DateTimePickerDefaultProps {
  return {
    cls,
    ariaLabel: 'Select date',
    backToCalendarAriaLabel: 'Back to calendar',
    className: '',
    disabled: false,
    enableTime: false,
    firstDayOfWeek: 1,
    inline: false,
    label: '',
    labelPlacement: 'top-start',
    locale: {},
    minuteIncrement: 5,
    mode: 'single',
    nextMonth: '▶',
    nextMonthAriaLabel: 'Next month',
    noCalendar: false,
    placeholder: 'Select date',
    previousMonthAriaLabel: 'Previous month',
    prevMonth: '◀',
    selectTimeAriaLabel: 'Select time',
    showMonths: 1,
    time24hr: true,
    weekNumbers: false,
    workingWeekDays: 5,
    yearSelect: false,
    yearSelectAriaLabel: 'Select year',
    ...overrides,
  };
}

afterEach(() => vi.unstubAllGlobals());

describe('dateTimePickerMediator', () => {
  it('given default props, when initialized, then it exposes stable relationship IDs and a closed popup', () => {
    const mediator = dateTimePickerMediator(createProps({ id: 'appointment' }));

    expect(mediator.state.inputId).toBe('_appointment');
    expect(mediator.state.triggerId).toBe('_appointment-trigger');
    expect(mediator.state.labelId).toBe('_appointment-label');
    expect(mediator.state.isOpen).toBe(false);

    mediator.useBeforeUnmount();
  });

  it('given an enabled picker, when a date is selected, then it updates state and reports the normalized value', () => {
    const onChange = vi.fn();
    const mediator = dateTimePickerMediator(createProps({ onChange }));
    const selectedDate = new Date(2026, 8, 28);

    mediator.selectDate(selectedDate);

    expect(mediator.state.value).toHaveLength(1);
    expect(onChange).toHaveBeenCalledWith(mediator.state.value[0]);

    mediator.useBeforeUnmount();
  });

  it('given controlled open props, when they change, then the popup state follows the prop', async () => {
    const props = reactive(createProps({ open: false }));
    const mediator = dateTimePickerMediator(props);

    props.open = true;

    await vi.waitFor(() => expect(mediator.state.isOpen).toBe(true));
    mediator.useBeforeUnmount();
  });

  it('given mounted references, when mounted again, then it replaces the outside-click listener', () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    vi.stubGlobal('document', { addEventListener, removeEventListener });
    const mediator = dateTimePickerMediator(createProps());
    const trigger = {} as HTMLElement;
    const calendar = {} as HTMLDivElement;
    const timeToggle = {} as HTMLButtonElement;

    mediator.useMounted(trigger, calendar, timeToggle);
    mediator.useMounted(trigger, calendar, timeToggle);

    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(1);

    mediator.useBeforeUnmount();
  });
});
