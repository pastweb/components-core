# Tag

Tag displays a short, non-interactive category or status label. Its rendering
contract targets WCAG 2.2 Level AA.

## When to use

Use Tag for a compact category or status. Visible text must describe the
status. Colour may reinforce meaning but must not be the only indicator. Use
`closeButton` only to dismiss the tag itself, not to start another action.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `""` | Accessible name when visible content is insufficient. Pass an empty string to omit it. |
| `className` | `string` | no | `""` | Additional classes. |
| `closeButton` | `boolean` | no | - | Displays the native close button. |
| `closeLabel` | `string` | no | `"Close tag"` | Names the close button. |
| `onClose` | `() => void` | no | noop | Reports close intent. |
| `rounded` | `boolean` | no | - | Applies `is-rounded`. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Tag_root_default_color` | `root` | `default` | `color` | `var(--pw_text_color)` | Tag foreground. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Tag background. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Border colour. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Border width. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Border style. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Corner radius. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_rounded_border-radius` | `root` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Rounded variant radius. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_padding` | `root` | `default` | `padding` | `0.125em 0.625em` | Inner spacing. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_font-size` | `root` | `default` | `font-size` | `var(--pw_small_font-size)` | Text size. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_font-weight` | `root` | `default` | `font-weight` | `var(--pw_bold_font-weight)` | Text weight. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_letter-spacing` | `root` | `default` | `letter-spacing` | `0.04em` | Uppercase tracking. | Web, Capacitor, NativeScript |
| `--pw_Tag_close-button_default_min-width` | `close-button` | `default` | `min-width` | `1.563em` | Close control width, scaled to Tag size. | Web, Capacitor, NativeScript |
| `--pw_Tag_close-button_default_height` | `close-button` | `default` | `height` | `1.563em` | Close control height, scaled to Tag size. | Web, Capacitor, NativeScript |

```xts
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';

export function Tag(props: TagProps) {
  const p = withDefaultProps<TagDefaultProps>(props, DEFAULT_PROPS);

  return (
    <div class={p.cls('Tag', { 'is-rounded': p.rounded, 'has-close': p.closeButton }, p.className)} aria-label={p.ariaLabel || undefined}>
      <span class={p.cls('content')}><slot /></span>
      <button #if={p.closeButton} type="button" class={p.cls('closeButton')} @click={p.onClose} aria-label={p.closeLabel}>
        <span class={p.cls('closeBar')} aria-hidden="true" />
        <span class={p.cls('closeBar')} aria-hidden="true" />
      </button>
    </div>
  );
}
```

## Keyboard interaction

- Without `closeButton`, Tag is not interactive and does not enter the tab order.
- The close action is a native button operable with `Enter` or `Space`.

## Accessibility notes

- Visible content is the default accessible name. `ariaLabel` supplements it
  when the visible text is insufficient.
- The close action is a native button named by `closeLabel`.
- Status meaning is carried by the text. Colour is decorative reinforcement.
- Shared web styles use uppercase status text, a Panel-style close control
  scaled to the Tag font size, visible `:focus-visible` indication, and
  forced-colours treatment.

## Known limitations

- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Native renderer mapping

Native renderers map Tag to a non-interactive accessible text container. Do not
copy ARIA attributes into native markup.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA APG patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK Tag: https://design-system.service.gov.uk/components/tag/
