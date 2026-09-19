# ToastController

ToastController presents a temporary, politely announced status message. Its
rendering contract targets WCAG 2.2 Level AA.

## When to use

Use ToastController for non-urgent confirmation or status that can disappear.
Use Notification for a persistent in-page message, an alert pattern for urgent
information, and a dialog when the user must decide before continuing.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `""` | Names the status region. Pass an empty string to omit it. |
| `portal` | `Portal` | no | - | Portal configuration. |
| `portalElement` | `HTMLElement` | no | - | Portal container. |
| `entryId` | `string` | no | - | Portal entry ID. |
| `placement` | `PLACEMENT` | no | `top-right` | Viewport placement. |
| `padding` | `number` | no | `15` | Inner padding in pixels. |
| `delay` | `number` | no | `5` | Auto-dismiss delay in seconds. |
| `timeUpdate` | `number` | no | `10` | Timer tick interval. |
| `animation` | `Animation` | no | `slide` | Entry and exit animation. |
| `closeOnEscKey` | `boolean` | no | `true` | Dismisses on `Escape`. |
| `pauseTimerOnOver` | `boolean` | no | `true` | Pauses the timer on pointer or keyboard focus. |
| `resetTimerOnPause` | `boolean` | no | `false` | Resets the timer when pausing. |
| `onClose` | `() => void` | no | noop | Reports close intent. |
| `onDestroy` | `() => void` | no | noop | Reports portal removal. |
| `onKeyDown` | `(event) => void` | no | noop | Observes keyboard input. |

## Keyboard interaction

- `Escape` dismisses the toast when `closeOnEscKey` is enabled.
- The toast does not enter sequential tab order. Interactive content inside it
  remains operable.

## Accessibility notes

- The toast is a polite `status` live region. It does not move focus on open.
- The auto-dismiss timer pauses while the pointer is over the toast, while it
  has keyboard focus, and while it is not fully visible.
- Time limits can be paused (`pauseTimerOnOver`) and dismissed early (`Escape`
  or a consumer close control).
- Shared web styles keep a visible `:focus-visible` indicator and disable
  non-essential motion under `prefers-reduced-motion`.

## Known limitations

- A visible close control is not built in. Supply one in the toast content when
  users must dismiss without waiting.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Native renderer mapping

Native renderers map the toast to a native polite announcement and timed overlay.
Do not copy ARIA attributes into native markup.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Status and alert patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK notification banner: https://design-system.service.gov.uk/components/notification-banner/
