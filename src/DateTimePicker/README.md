# DateTimePicker

`DateTimePicker` is a framework-neutral calendar and time-selection mediator. Renderers provide the target and popup integration; the mediator owns value normalization, single/multiple/range selection, calendar navigation, date rules, and keyboard intent.

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
