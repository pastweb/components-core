# DateTimePicker

`DateTimePicker` is a framework-neutral calendar and time-selection mediator. Renderers provide the target and popup integration; the mediator owns value normalization, single/multiple/range selection, calendar navigation, date rules, and keyboard intent.

## Features

- Single, multiple, and range date selection.
- Optional time selection, calendar-only, and time-only modes.
- Controlled or uncontrolled popup visibility and selected values.
- Keyboard calendar navigation, date rules, localized labels, and accessible IDs.
- A renderer-neutral target-props context for custom trigger implementations.

```xts
<DateTimePicker
  mode="range"
  enableTime
  minDate={today}
  disable={[weekends]}
  locale={{ months, weekdays, clear: 'Clear' }}
  onChange={value => booking.dates = value}
/>
```

## Values

Use a `Date`, an array of `Date` values, or `null`. `single` returns one date in an array internally and `multiple`/`range` return arrays. The public change callback uses `Date | Date[] | null` so consumers can preserve the same value shape they provide.

```xts
<DateTimePicker value={departure} onChange={value => departure = value} />
<DateTimePicker mode="multiple" defaultValue={[firstDate, secondDate]} />
<DateTimePicker mode="range" value={stay} />
```

## Calendar rules and language

`minDate`, `maxDate`, `disable`, and `enable` constrain selection. Rules accept a date, an inclusive `{ from, to }` range, or a predicate returning `true` when it matches.

The component does not read an application i18n service. Supply the calendar words directly with `locale` when a language is required.

```xts
<DateTimePicker
  minDate={today}
  disable={[date => date.getDay() === 0 || date.getDay() === 6]}
  locale={{
    months: italianMonths,
    weekdays: italianWeekdays,
    previousMonth: 'Mese precedente',
    nextMonth: 'Mese successivo',
  }}
/>
```

## Rendering modes

The default picker is positioned locally, like `Select`. Set `inline` for an always-visible calendar that does not open and close.

```xts
<DateTimePicker inline weekNumbers showMonths={1} />
<DateTimePicker enableTime noCalendar minuteIncrement={15} />
```

## Calendar presentation

Set `yearSelect` to render a compact year selector beside the month name. Its range follows `minDate` and `maxDate`, or otherwise surrounds the viewed year.

`workingWeekDays` counts working days from Monday (default `5` for Monday–Friday). Remaining days receive the `is-free-day` state. Saturdays and Sundays always receive `is-sat` and `is-sun`; dates listed in `holidaysDates` receive `is-holiday`. Use `getDayClassName` for application-specific states.

```xts
<DateTimePicker
  yearSelect
  workingWeekDays={4}
  holidaysDates={[companyHoliday]}
  getDayClassName={date => date.toDateString() === releaseDay.toDateString() ? 'is-release-day' : undefined}
/>
```

## Target and accessibility labels

Renderers use their default target when no `target` slot is supplied. The default target displays date and time values as `<date> - <time>`, caps its width at `20rem`, and horizontally scrolls long multiple selections while keeping the arrow visible. Override the width through `--pw_DateTimePicker_target_default_max-width`.

Set `label` and `labelPlacement` to render a visible label using the same placement utilities as `Select`. `labelPlacement` defaults to `'top-start'` and accepts the standard placement values such as `'bottom'`, `'left-end'`, and `'right-start'`. A visible label is linked to the default target through `aria-labelledby`.

```xts
<DateTimePicker label="Appointment" labelPlacement="left" />
```

Provide `ariaLabel`, `previousMonthAriaLabel`, `nextMonthAriaLabel`, `yearSelectAriaLabel`, `selectTimeAriaLabel`, and `backToCalendarAriaLabel` when the default English labels do not fit the product vocabulary.

```xts
<DateTimePicker
  ariaLabel="Appointment date and time"
  previousMonthAriaLabel="Show previous appointment month"
  selectTimeAriaLabel="Choose appointment time"
/>
```

## Renderer integration

Renderers own their target, calendar, and time-toggle references, then provide
them together after mounting. This keeps the mediator independent of framework
ref objects and slot mechanisms.

```xts
const triggerReference = getTriggerElement();
const calendarReference = getCalendarElement();
const timeToggleReference = getTimeToggleElement();

mediator.useMounted(
  triggerReference,
  calendarReference,
  timeToggleReference,
);
```

Custom targets consume renderer-provided bindings from the shared
`DATETIME_PICKER_TRIGGER_PROPS_CONTEXT_KEY`. The core
`DateTimePickerTriggerProps` contract provides the ID, role, tab index, ARIA
attributes, and click/keyboard handlers. Each renderer adapts only its own ref
and event types.

## Summary

Use DateTimePicker when users need to choose a date, date range, or time with
calendar guidance. Use a native date input when the browser-provided control is
sufficient and a richer calendar interface is unnecessary.
