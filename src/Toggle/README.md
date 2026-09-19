# Toggle

Toggle represents an immediate binary setting. The web renderer uses a native
checkbox with `role="switch"`. Its rendering contract follows the WAI-ARIA
Switch pattern and targets WCAG 2.2 Level AA.

## When to use

Use Toggle for an immediate on/off setting. Use Checkbox for a form choice that
is submitted later. Prefer a pair of radios when both options need visible
labels, such as “On” and “Off”.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `"Toggle"` | Names the switch when no visible `label` is supplied. Pass an empty string to omit it. |
| `className` | `string` | no | `""` | Additional root classes. |
| `disabled` | `boolean` | no | `false` | Disables the control and applies `is-disabled`. |
| `id` | `string \| number` | no | generated | Native control ID. Generated IDs use the `toggle` prefix. |
| `label` | `string` | no | `""` | Visible accessible label. |
| `labelPlacement` | `Placement` | no | `'top-start'` | Visual label position. |
| `name` | `string` | no | - | Native form name. |
| `onChange` | `(checked, event) => void` | no | noop | Reports state changes. |
| `tabIndex` | `number` | no | `0` | Sequential focus order. |
| `value` | `boolean` | no | `false` | Controlled checked state. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name when no visible `label` is present. |
| `inputId` | `string` | Native input ID from an explicit `id` or a generated `toggle` prefix. |
| `isDisabled` | `true \| undefined` | Is `true` when the Toggle is disabled; otherwise omitted. |
| `value` | `boolean` | Checked state used for `.is-checked`, native `checked`, and `aria-checked`. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Toggle_root_default_margin` | `root` | `default` | `margin` | shared margins | Component spacing. | Web, Capacitor, NativeScript |
| `--pw_Toggle_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled appearance. | Web, Capacitor, NativeScript |
| `--pw_Toggle_background_default_width` | `track` | `default` | `width` | `4em` | Track width. | Web, Capacitor, NativeScript |
| `--pw_Toggle_background_default_height` | `track` | `default` | `height` | `2.75em` | Track height, with a 44px web target. | Web, Capacitor, NativeScript |
| `--pw_Toggle_root_default_background-color` | `track` | `default` | `background-color` | `var(--pw_control_background-color)` | Unchecked track. | Web, Capacitor, NativeScript |
| `--pw_Toggle_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Label colour. | Web, Capacitor, NativeScript |

```xts
import { useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/x';
import { toggleMediator } from '@pastweb/components-core/Toggle';
import { DEFAULT_PROPS } from './constants';

export function Toggle(props: ToggleProps) {
  const p = withDefaultProps<ToggleDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ToggleMediator>(toggleMediator, p);
  const s = m.state;

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div class={p.cls('Toggle', `label-${p.labelPlacement}`, { 'is-checked': s.value, 'is-disabled': s.isDisabled }, p.className)}>
      <label class={p.cls('control')}>
        <span class={p.cls('button')}>
          <input type="checkbox" role="switch" id={s.inputId} checked={s.value} disabled={s.isDisabled}
            aria-checked={s.value} aria-disabled={s.isDisabled} aria-label={s.ariaLabel}
            @change={event => m.onChange(event.target.checked, event)} />
        </span>
        <span #if={p.label} class={p.cls('label', p.labelPlacement)}>{p.label}</span>
      </label>
    </div>
  );
}
```

## Keyboard interaction

- `Space` toggles the native switch.
- `Tab` and `Shift+Tab` move sequential focus.

## Accessibility notes

- The web renderer uses a native checkbox with `role="switch"` and
  `aria-checked`.
- One wrapping label supplies the visible accessible name. When visible label
  text is absent, the mediator exposes `ariaLabel`.
- Disabled switches use native `disabled`, `aria-disabled="true"`, and
  `is-disabled`.
- Shared web styles provide at least a 44 by 44 CSS-pixel target, visible
  `:focus-visible` indication, forced-colours treatment, and reduced-motion
  behavior.

## Native renderer mapping

Native renderers map Toggle to the platform switch control. Do not copy ARIA
attributes into native markup.

## Known limitations

- GOV.UK prefers radios or checkboxes when both options need equal visible
  labels. Use Toggle only for an immediate setting.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Switch pattern: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
- GOV.UK radios: https://design-system.service.gov.uk/components/radios/
