# Spinner

Spinner displays a rotating visual indicator and exposes a polite loading
status. Its rendering contract targets WCAG 2.2 Level AA.

## When to use

Use it for short waits when completion cannot be calculated. Use ProgressBar for
determinate work. Do not rely on animation alone: keep the accessible label
specific to the operation.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and part classes. |
| `ariaLabel` | `string` | no | `"Loading"` | Accessible status name. Pass an empty string to omit the name. |
| `decorative` | `boolean` | no | `false` | Removes status semantics and applies `is-decorative`. |
| `className` | `string` | no | `""` | Additional root classes. |

The default slot supplies the visual glyph and is hidden from assistive
technology.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized status name. Decorative and empty labels are omitted. |
| `ariaLive` | `'polite' \| undefined` | Is `polite` unless decorative. |
| `role` | `'status' \| undefined` | Is `status` unless decorative. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Spinner_root_default_width` | `root` | `default` | `width` | `1.5em` | Indicator width. | Web, Capacitor, NativeScript |
| `--pw_Spinner_root_default_height` | `root` | `default` | `height` | `1.5em` | Indicator height. | Web, Capacitor, NativeScript |
| `--pw_Spinner_root_default_color` | `root` | `default` | `color` | `currentcolor` | Indicator colour. | Web, Capacitor, NativeScript |
| `--pw_Spinner_content_default_animation-duration` | `content` | `default` | `animation-duration` | `2s` | Rotation duration. | Web, Capacitor; NativeScript adapter |
| `--pw_Spinner_content_default_animation-timing-function` | `content` | `default` | `animation-timing-function` | `linear` | Rotation timing. | Web, Capacitor; NativeScript adapter |

```xts
import { useMediator, withDefaultProps } from '@pastweb/x';
import { spinnerMediator } from '@pastweb/components-core/Spinner';
import { DEFAULT_PROPS } from './constants';

export function Spinner(props: SpinnerProps) {
  const p = withDefaultProps<SpinnerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SpinnerMediator>(spinnerMediator, p);
  const s = m.state;

  return (
    <div class={p.cls('Spinner', { 'is-decorative': p.decorative }, p.className)}
      role={s.role} aria-label={s.ariaLabel} aria-live={s.ariaLive}>
      <span class={p.cls('content')} aria-hidden="true"><slot /></span>
    </div>
  );
}
```

## Keyboard interaction

- Spinner is not interactive. It does not enter the tab order.

## Accessibility notes

- The web renderer exposes a named polite status unless decorative.
- Decorative spinners omit role, name, and live region.
- Shared web styles disable non-essential rotation under `prefers-reduced-motion`.

## Known limitations

- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA status guidance: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK components: https://design-system.service.gov.uk/components/
