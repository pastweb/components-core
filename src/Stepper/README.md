# Stepper

Stepper communicates progress through an ordered sequence. `active` remains
one-based for compatibility. A step is interactive only when it supplies
`onClick`; disabled interactive steps use a native disabled button. Its
rendering contract targets WCAG 2.2 Level AA.

## When to use

Use Stepper for a known sequence of stages. Do not use it as a page navigation
control unless each step is also a destination. Prefer a native continue action
and back link for linear form journeys that do not need a visible map of every
stage.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `steps` | `Step[]` | yes | - | Ordered labels, descriptions, indicators and optional actions. |
| `active` | `number` | no | `1` | Current one-based step. |
| `id` | `string` | no | generated | Supplies the host ID. Generated IDs use the `stepper` prefix. Explicit IDs are stored as `_${id}`. |
| `ariaLabel` | `string` | no | `"Progress"` | Names the ordered sequence. Pass an empty string to omit it. |
| `orientation` | `'horizontal' \| 'vertical'` | no | `'horizontal'` | Visual direction. |
| `labelPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | no | `'top'` | Visual label position. Horizontal uses `top` or `bottom` (`top` when omitted or invalid). Vertical uses `left` or `right` (`right` when omitted or invalid). |
| `className` | `string` | no | `""` | Additional root classes. |

`Step` supports `label`, `description`, `content`, `ariaLabel`, `className`,
`disabled`, and `onClick`. The current list item exposes `aria-current="step"`.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized sequence name. Empty labels are omitted. |
| `id` | `string` | Host ID from an explicit `id` or a generated `stepper` prefix. |
| `labelPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | Resolved label side for the current orientation. |

`getStepState(index)` returns `'active'`, `'complete'`, or `'pending'`. Title
and description IDs use `title${id}${index}` and `description${id}${index}`.

## CSS classes

| Class | Applied when | Notes |
|---|---|---|
| `Stepper` | Always | Root component class. |
| `is-horizontal` / `is-vertical` | `orientation` | Axis of the ordered list. |
| `labels-top` / `labels-bottom` / `labels-left` / `labels-right` | resolved `labelPosition` | Horizontal applies `labels-top` or `labels-bottom`. Vertical applies `labels-left` or `labels-right`. |
| `is-active` | current step | Applied to the list item. |
| `is-complete` | earlier steps | Applied to the list item. |
| `is-pending` | later steps | Applied to the list item. |
| `is-disabled` | `step.disabled` | Applied to the list item. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Stepper_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_background-color)` | Component background. | Web, Capacitor, NativeScript |
| `--pw_Stepper_root_disabled_opacity` | `root` | `disabled` | `opacity` | shared disabled opacity | Disabled step appearance. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_default_background-color` | `indicator` | `default` | `background-color` | `var(--pw_control_background-color)` | Indicator background. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_active_border-color` | `indicator` | `active` | `border-color` | strong text | Active indicator border. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_complete_background-color` | `indicator` | `complete` | `background-color` | shared text | Complete indicator background. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_default_outline` | `indicator` | `default` | `outline` | shared outline | Keyboard focus indicator. | Web, Capacitor |
| `--pw_Stepper_indicator-target_default_width` | `indicator-target` | `default` | `width` | `2.75em` | Pointer target width. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator-target_default_height` | `indicator-target` | `default` | `height` | `2.75em` | Pointer target height. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_slot_size` | `indicator` | `default` | `width` / `height` | calculated | Indicator box used to centre labels. | Web, Capacitor |
| `--pw_Stepper_label_default_color` | `label` | `default` | `color` | `var(--pw_text_color)` | Label colour. | Web, Capacitor, NativeScript |

```xts
import { useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/x';
import { stepperMediator } from '@pastweb/components-core/Stepper';
import { DEFAULT_PROPS, DEFAULT_STEP_PROPS } from './constants';

export function Stepper(props: StepperProps) {
  const p = withDefaultProps<StepperDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<StepperMediator>(stepperMediator, p);
  const s = m.state;
  const steps = p.steps.map(step => withDefaultProps<StepDefaultProps>(step, DEFAULT_STEP_PROPS));

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div id={m.id} class={p.cls('Stepper', `is-${p.orientation}`, `labels-${s.labelPosition}`, p.className)}>
      <ol class={p.cls('steps')} aria-label={s.ariaLabel}>
        {steps.map((step, index) => {
          const state = m.getStepState(index);
          const titleId = `title${m.id}${index}`;
          return (
            <li class={p.cls('step', `is-${state}`, { 'is-disabled': step.disabled }, step.className)}
              aria-current={state === 'active' ? 'step' : undefined}>
              <div class={p.cls('step-main')}>
                <button #if={step.onClick !== DEFAULT_STEP_PROPS.onClick} type="button"
                  class={p.cls('indicator')} disabled={step.disabled} @click={step.onClick}
                  aria-label={step.ariaLabel} aria-labelledby={!step.ariaLabel && step.label ? titleId : undefined}>
                  <span class={p.cls('indicator-content')} aria-hidden="true">{step.content ?? index + 1}</span>
                </button>
                <span #else class={p.cls('indicator')}>
                  <span class={p.cls('indicator-content')} aria-hidden="true">{step.content ?? index + 1}</span>
                </span>
                <span #if={index < steps.length - 1} class={p.cls('line')} aria-hidden="true" />
              </div>
              <div #if={step.label || step.description} class={p.cls('label')}>
                <span #if={step.label} id={titleId} class={p.cls('title')}>{step.label}</span>
                <small #if={step.description} id={`description${m.id}${index}`}>{step.description}</small>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
```

## Keyboard interaction

- Interactive steps are native buttons operable with `Enter` or `Space`.
- Disabled interactive steps are skipped in the tab order.
- Non-interactive steps do not enter the tab order.

## Accessibility notes

- The sequence is a named ordered list. The current item exposes `aria-current="step"`.
- Visible labels name interactive steps through `aria-labelledby`. Empty `ariaLabel` values fall back to `Step N of M` when no visible label is present.
- Indicator glyphs are hidden from assistive technology.
- Connecting lines are decorative.
- Pointer targets remain at least 44 CSS pixels even when the visible indicator is smaller.
- Shared web styles keep a visible `:focus-visible` indicator.

## Known limitations

- Nested steppers require distinct labels so the sequences remain distinguishable.
- Automated accessibility checks do not by themselves establish WCAG conformance.

## Native renderer mapping

Native renderers use an accessible ordered collection. Do not copy ARIA
attributes into native markup. Interactive steps map to native buttons with
native disabled state. Focus restoration and current-step identification use
the platform equivalent of `aria-current="step"`.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA APG patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK task list: https://design-system.service.gov.uk/components/task-list/
