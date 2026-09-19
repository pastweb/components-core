# RangeSlider

RangeSlider selects one numeric value from a bounded range using the native
range control. Its rendering contract follows the WAI-ARIA Slider pattern and
targets WCAG 2.2 Level AA.

## When to use

Use it when an approximate value is acceptable and the range is meaningful. Use
a numeric input when users must enter an exact value. Always supply a visible
`label` or a specific `ariaLabel`.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component, part, and state classes. |
| `ariaLabel` | `string` | no | `"Range value"` | Names the slider when no visible label is supplied. Pass an empty string to omit the name. |
| `id` | `string` | no | generated | Stable native input ID. Generated IDs use the `rangeSlider` prefix. Explicit IDs are stored as `_${id}`. |
| `label` | `string` | no | `""` | Visible native label. |
| `labelPlacement` | aligned placement | no | `'top-start'` | Label placement. |
| `min` | `number` | yes | - | Minimum. |
| `max` | `number` | yes | - | Maximum. |
| `step` | `number` | no | browser default | Increment. |
| `value` | `number` | no | range midpoint | Current value. |
| `disabled` | `boolean` | no | `false` | Disables the native input and applies `is-disabled`. |
| `onChange` | `(value, event) => void` | no | noop | Reports each value change. |
| `onMouseUp` | `(value) => void` | no | noop | Compatibility callback reporting committed pointer or keyboard value. |
| `className` | `string` | no | `""` | Additional root classes. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name when no visible `label` is present. Empty labels are omitted. |
| `inputId` | `string` | Native input ID from an explicit `id` or a generated `rangeSlider` prefix. |
| `isDisabled` | `true \| undefined` | Is `true` when the slider is disabled; otherwise omitted. Renderers use this value directly for `.is-disabled` and native `disabled`. |
| `value` | `string` | Clamped current value as a string for the native range input. |

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-full-width` | Expands the slider to the available width. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_RangeSlider_root_default_margin` | `root` | `default` | `margin` | shared margins | Component spacing. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled appearance. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_height` | `track` | `default` | `height` | `0.8em` | Track height. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_background-color` | `track` | `default` | `background-color` | `var(--pw_control_background-color)` | Track background. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_border-color` | `track` | `default` | `border-color` | `var(--pw_border-color)` | Track and thumb border. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_border-radius` | `track` | `default` | `border-radius` | `var(--pw_border-radius)` | Track corners. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_border-style` | `track` | `default` | `border-style` | `var(--pw_border-style)` | Track and thumb border style. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_border-width` | `track` | `default` | `border-width` | `var(--pw_border-width)` | Track and thumb border width. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_width` | `thumb` | `default` | `width` | `1.562em` | Pointer target width. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_height` | `thumb` | `default` | `height` | `1.562em` | Pointer target height. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_background-color` | `thumb` | `default` | `background-color` | track background | Thumb background. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_border-radius` | `thumb` | `default` | `border-radius` | `50%` | Thumb shape. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_transition-duration` | `thumb` | `default` | `transition-duration` | `var(--pw_transition-duration)` | Thumb visual duration. | Web, Capacitor; NativeScript adapter |
| `--pw_RangeSlider_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Label colour. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_label_default_font-size` | `label` | `default` | `font-size` | `var(--pw_font-size)` | Label font size. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_label_default_font-weight` | `label` | `default` | `font-weight` | `var(--pw_semibold_font-weight)` | Label font weight. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_label_default_line-height` | `label` | `default` | `line-height` | `var(--pw_line-height)` | Label line height. | Web, Capacitor, NativeScript |

```xts
import { useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/x';
import { rangeSliderMediator } from '@pastweb/components-core/RangeSlider';
import { DEFAULT_PROPS } from './constants';

export function RangeSlider(props: RangeSliderProps) {
  const p = withDefaultProps<RangeSliderDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<RangeSliderMediator>(rangeSliderMediator, p);
  const s = m.state;

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div class={p.cls('RangeSlider', `label-${p.labelPlacement}`, { 'is-disabled': s.isDisabled }, p.className)}>
      <input class={p.cls('slider')} type="range" id={s.inputId} min={p.min} max={p.max}
        step={p.step} value={s.value} disabled={s.isDisabled}
        aria-label={s.ariaLabel}
        @change={event => m.onChange(event.target.value, event)}
        @pointerup={m.onChangeEnd} @keyup={m.onChangeEnd} />
      <label #if={p.label} class={p.cls('label', p.labelPlacement)} for={s.inputId}>{p.label}</label>
    </div>
  );
}
```

## Keyboard interaction

- Arrow keys, `Home`, `End`, `PageUp`, and `PageDown` adjust the native range
  value.
- `Tab` and `Shift+Tab` move sequential focus to the available slider.

## Accessibility notes

- The native input supplies slider role, values, keyboard operation, and
  disabled behavior.
- The visible label is connected through `for`/`id`. When it is absent,
  `ariaLabel` names the slider. The default name is `Range value`.
- Disabled state is reflected through `.is-disabled` and native `disabled`.
- Shared web styles provide a visible `:focus-visible` indicator, forced-colours
  treatment, and reduced-motion behavior.

## Known limitations

- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Slider pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/
- GOV.UK form controls: https://design-system.service.gov.uk/components/
