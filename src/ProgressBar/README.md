# ProgressBar

ProgressBar communicates the completion of a determinate task in linear or
circular form. Its rendering contract targets WCAG 2.2 Level AA.

## When to use

Use it when a numeric completion value is known, such as an upload or processing
task. Use a separate indeterminate status indicator when completion cannot be
calculated. Keep important status text available as accessible value text, not
only as a visual bar.

Do not use it as a multi-step form progress indicator. GOV.UK guidance is to
avoid step trackers that show every question at once.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and part classes. |
| `ariaLabel` | `string` | no | `"Progress"` | Accessible name for the progressbar. Pass an empty string to omit the name. |
| `total` | `number` | conditional | - | Total used with `current`. |
| `current` | `number` | conditional | - | Current value used with `total`. |
| `percentage` | `number` | conditional | - | Direct percentage; clamped from 0 to 100. |
| `label` | `string \| (values) => string` | no | `"%"` | Visible and accessible value text; use an empty string to hide it. |
| `type` | `'linear' \| 'circular'` | no | `'linear'` | Visual presentation. |
| `size` | `number` | no | `100` | Circular SVG coordinate size. |
| `className` | `string` | no | `""` | Additional root classes. |

Provide either `percentage` or both `total` and `current`.

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-rounded` | Uses the rounded progress-bar radius token. |
| `is-outlined` | Uses the page background for the unfilled track so the bar reads as outlined. |
| `is-full-width` | Expands the progress bar to the available width. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name. Empty labels are omitted. |
| `circumference` | `number` | Circular stroke length. |
| `labelContent` | `string \| null` | Visible value label, or `null` when `label` is empty. |
| `offset` | `number` | Circular stroke offset for the remaining portion. |
| `percentage` | `number` | Completion from 0 to 100. Renderers use this for `aria-valuenow`. |
| `radius` | `number` | Circular track radius from `size`. |
| `valueText` | `string` | Accessible value text. Falls back to `percentage%` when the label is hidden. |
| `width` | `string` | Linear filler width as a percentage string. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_ProgressBar_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Unfilled track colour. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Linear border colour. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Linear corner radius. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_rounded_border-radius` | `root` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Corner radius for `is-rounded`. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Linear border style. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Linear border width. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_label_default_color` | `label` | `default` | `color` | `inherit` | Value-label colour. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_fill_default_background-color` | `fill` | `default` | `background-color` | border colour | Linear completion colour. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_fill_default_stroke` | `fill` | `default` | `stroke` | border colour | Circular completion stroke. | Web, Capacitor |
| `--pw_ProgressBar_linear_default_height` | `linear` | `default` | `height` | `2em` | Linear bar height. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_circular_default_width` | `circular` | `default` | `width` | `5em` | Circular width. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_circular_default_height` | `circular` | `default` | `height` | `5em` | Circular height. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_circle_default_stroke-width` | `circle` | `default` | `stroke-width` | `0.5em` | Circular stroke width. | Web, Capacitor |
| `--pw_ProgressBar_circle_default_stroke-linecap` | `circle` | `default` | `stroke-linecap` | `round` | Circular stroke cap. | Web, Capacitor |

```xts
import { useMediator, withDefaultProps } from '@pastweb/x';
import { progressbarMediator } from '@pastweb/components-core/ProgressBar';
import { DEFAULT_PROPS } from './constants';

export function ProgressBar(props: ProgressBarProps) {
  const p = withDefaultProps<ProgressBarDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ProgressBarMediator>(progressbarMediator, p);
  const s = m.state;

  return (
    <div
      class={p.cls('ProgressBar', `type-${p.type}`, p.className)}
      role="progressbar"
      aria-label={s.ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={s.percentage}
      aria-valuetext={s.valueText}
    >
      <div #if={p.type === 'linear'} class={p.cls('linear')}>
        <div class={p.cls('filler')} #style={{ width: s.width }}>
          <div #if={s.labelContent} class={p.cls('label')}>{s.labelContent}</div>
        </div>
      </div>
      <div #if={p.type === 'circular'} class={p.cls('circular')}>
        <svg class={p.cls('svg')} viewBox={`0 0 ${p.size} ${p.size}`} aria-hidden="true">
          <circle class={p.cls('track')} cx={p.size / 2} cy={p.size / 2} r={s.radius} />
          <circle class={p.cls('fill')} cx={p.size / 2} cy={p.size / 2} r={s.radius}
            stroke-dasharray={s.circumference} stroke-dashoffset={s.offset} />
        </svg>
        <div #if={s.labelContent} class={p.cls('label')}>{s.labelContent}</div>
      </div>
    </div>
  );
}
```

## Keyboard interaction

- ProgressBar is not interactive. It does not enter the tab order.

## Accessibility notes

- The web renderer exposes the `progressbar` role, a name, and values from 0 to
  100. The SVG is decorative.
- The default accessible name is `Progress`. An explicit empty string omits the
  name.
- Visible `label` content is also used as `aria-valuetext`. Hiding the label
  still exposes a numeric value text.
- Shared web styles support `forced-colors` and disable non-essential
  transitions under `prefers-reduced-motion`.

## Known limitations

- ProgressBar is determinate only. It does not represent unknown remaining time.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Meter pattern: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
- GOV.UK components: https://design-system.service.gov.uk/components/
