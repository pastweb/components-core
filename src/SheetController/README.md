# SheetController

SheetController presents an animated, optionally modal dialog surface from an
edge of its portal container. Its rendering contract follows the WAI-ARIA Dialog
(Modal) pattern and targets WCAG 2.2 Level AA.

## When to use

Use it for secondary tasks that need more space than a popover without
navigating away. Do not use it for essential content that should remain
permanently visible. A modal sheet must include an obvious close control inside
its content.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and part classes. |
| `id` | `string` | no | generated | Supplies the dialog ID. Generated IDs use the `sheetController` prefix. Explicit IDs are stored as `_${id}`. |
| `ariaLabel` | `string` | no | `'Sheet'` | Accessible dialog name. Pass an empty string to omit the name. |
| `className` | `string` | no | `''` | Additional root classes. |
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | no | `'left'` | Entry and exit edge. |
| `backdrop` | `boolean` | no | `false` | Displays the native backdrop button and applies `has-backdrop`. |
| `modal` | `boolean` | no | `false` | Enables `aria-modal`, focus containment, and `is-modal`. |
| `closeOnBackdropClick` | `boolean` | no | `true` | Allows backdrop activation to close. |
| `closeOnEscape` | `boolean` | no | `true` | Allows Escape to close unless the event is prevented. |
| `animationTime` | `number` | no | `400` | Fallback close duration in milliseconds. |
| `width`, `height` | `number \| string` | no | - | Inline sheet dimensions. |
| `top`, `right`, `bottom`, `left` | `number \| string` | no | - | Inline sheet offsets. |
| `portal`, `portalElement`, `entryId` | portal integration | no | - | Optional host integration used for update/remove/close events. |
| `onClose` | `() => void` | no | noop | Reports completed closure once. |
| `onKeyDown` | `(event: SheetKeyboardEvent) => void` | no | noop | Observes keyboard input before default Escape handling. |

The default slot supplies dialog content. Include a native close button that
calls `useSheetContext().close()`.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized dialog name. Empty labels are omitted. |
| `id` | `string` | Dialog ID from an explicit `id` or a generated `sheetController` prefix. |
| `isClosed` | `boolean` | Is `true` after closure is finalized and the surface should unmount. |
| `isClosing` | `boolean` | Is `true` during the exit animation; content is inert. |
| `isOpen` | `boolean` | Is `true` while the sheet is shown and not closing. |

## CSS classes

| Class | Applied when | Notes |
|---|---|---|
| `SheetController` | Always | Root overlay class. |
| `has-backdrop` | `backdrop` is `true` | Backdrop overlay is present. |
| `is-open` | `isOpen` is `true` | Sheet is visible. |
| `is-modal` | `modal` is `true` | Modal focus containment is active. |
| `is-closing` | `isClosing` is `true` | Exit animation; pointer events disabled. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_SheetController_root_default_width` | `root` | `default` | `width` | `100%` | Overlay width. | Web, Capacitor, NativeScript |
| `--pw_SheetController_root_default_height` | `root` | `default` | `height` | `100%` | Overlay height. | Web, Capacitor, NativeScript |
| `--pw_SheetController_backdrop_default_background-color` | `backdrop` | `default` | `background-color` | shared backdrop | Backdrop colour. | Web, Capacitor, NativeScript |
| `--pw_SheetController_sheet_default_background-color` | `sheet` | `default` | `background-color` | shared background | Sheet background. | Web, Capacitor, NativeScript |
| `--pw_SheetController_sheet_default_color` | `sheet` | `default` | `color` | shared text | Sheet foreground. | Web, Capacitor, NativeScript |
| `--pw_SheetController_sheet_default_box-shadow` | `sheet` | `default` | `box-shadow` | elevation shadow | Sheet elevation. | Web, Capacitor |
| `--pw_SheetController_sheet_default_animation-duration` | `sheet` | `default` | `animation-duration` | `400ms` | Edge animation duration. | Web, Capacitor; native adapter |
| `--pw_SheetController_sheet_default_animation-timing-function` | `sheet` | `default` | `animation-timing-function` | `ease` | Edge animation timing. | Web, Capacitor; native adapter |
| `--pw_SheetController_sheet_default_animation-fill-mode` | `sheet` | `default` | `animation-fill-mode` | `forwards` | Edge animation fill. | Web, Capacitor; native adapter |
| `--pw_SheetController_sheet_default_outline` | `sheet` | `default` | `outline` | shared outline | Keyboard focus indicator. | Web, Capacitor |
| `--pw_SheetController_sheet_default_outline-offset` | `sheet` | `default` | `outline-offset` | `0.125em` | Focus outline offset. | Web, Capacitor |

```xts
import { setContext, useBeforeUnmount, useMediator, useMounted, useRef, withDefaultProps } from '@pastweb/x';
import { sheetControllerMediator, SHEET_CONTEXT_KEY } from '@pastweb/components-core/SheetController';
import { DEFAULT_PROPS } from './constants';

export function SheetController(props: SheetControllerProps) {
  const p = withDefaultProps<SheetControllerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SheetControllerMediator>(sheetControllerMediator, p);
  const s = m.state;
  const c = m.getContext();
  const sheet = useRef();

  setContext(SHEET_CONTEXT_KEY, c);
  useMounted(() => m.useMounted(sheet.value, p.portalElement));
  useBeforeUnmount(m.useBeforeUnmount);

  if (s.isClosed) return null;

  return (
    <div class={p.cls('SheetController', {
      'has-backdrop': p.backdrop, 'is-closing': s.isClosing,
      'is-modal': p.modal, 'is-open': s.isOpen,
    }, p.className)} #style={{ animation-duration: `${p.animationTime}ms` }}>
      <button #if={p.backdrop} type="button" class={p.cls('backdrop')}
        tabindex={-1} aria-hidden="true" @click={m.onBackdrop} />
      <div #ref={sheet} id={m.id} class={p.cls('sheet', {
        [`sheet-open-${p.direction}`]: s.isOpen,
        [`sheet-close-${p.direction}`]: s.isClosing,
      })} role="dialog" aria-label={s.ariaLabel} aria-modal={p.modal || undefined}
        aria-hidden={s.isClosing || undefined} inert={s.isClosing || undefined} tabindex={-1}
        @keydown={m.onKeyDown} @animationend={m.onTransitionEnd}>
        <slot />
      </div>
    </div>
  );
}
```

## Keyboard interaction

- Focus moves to the sheet when mounted.
- `Escape` closes when `closeOnEscape` is enabled, unless the consumer prevents the event.
- Modal sheets keep `Tab` and `Shift+Tab` inside their focusable content.
- Focus returns to the previously focused element when closing or unmounting.

## Accessibility notes

- The web renderer exposes a named `dialog`. `aria-modal` is set only when `modal` is true.
- The backdrop is a native `button` excluded from the tab order and accessibility tree.
- Closing content becomes inert immediately; animation completion or the timer finalizes portal removal.
- Shared web styles keep a visible `:focus-visible` indicator and disable non-essential motion under `prefers-reduced-motion`.

## Known limitations

- Nested sheets require distinct labels so dialog announcements remain understandable.
- A modal sheet still depends on its content to provide a visible close control.
- Automated accessibility checks do not by themselves establish WCAG conformance.

## Native renderer mapping

NativeScript maps the sheet to an accessible modal or non-modal native container,
uses native focus containment and restoration, maps edge directions to native
animations, makes closing content unavailable immediately, and calls
`onTransitionEnd` when animation completes. Back gestures and Escape-compatible
keys call the same close intent.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Dialog (Modal) pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- GOV.UK components: https://design-system.service.gov.uk/components/
