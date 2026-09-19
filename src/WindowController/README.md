# WindowController

WindowController presents either a modal dialog or a movable floating work
surface. Its rendering contract follows the WAI-ARIA Dialog pattern and targets
WCAG 2.2 Level AA.

## When to use

Use a modal window when the user must complete or dismiss a task before
continuing. Use a floating window for a parallel work surface that does not
block the rest of the page.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `"Window"` | Accessible dialog name. |
| `portal` | `Portal` | no | - | Portal configuration. |
| `portalElement` | `HTMLElement` | no | - | Portal container. |
| `entryId` | `string` | no | - | Portal entry ID. |
| `manager` | `WindowManager` | no | - | Application manager for shared state, visibility, focus, bounds, and taskbar behavior. |
| `getTaskBarButtonBounds` | `(id) => WindowBounds \| undefined` | no | - | Supplies the matching taskbar button bounds for minimize and restore animation. |
| `mode` | `'modal' \| 'floating'` | no | `'modal'` | Dialog modality and movement behavior. |
| `moveCursor` | `boolean` | no | `true` | Enables the move cursor in floating mode. |
| `resizable` | `boolean` | no | `false` | Enables resize handles and `is-resizable`. |
| `resizeCursor` | `boolean` | no | `true` | Enables resize cursors. |
| `width` | `number` | no | - | Initial width in pixels. |
| `height` | `number` | no | - | Initial height in pixels. |
| `animation` | `Animation` | no | `zoom` | Entry and exit animation. |
| `closeOnBackdropClick` | `boolean` | no | `true` | Dismisses a modal from the backdrop. |
| `closeOnEscape` | `boolean` | no | `true` | Dismisses on `Escape` unless the consumer prevents the event. |
| `onClose` | `() => void` | no | noop | Reports completed close. |
| `onKeyDown` | `(event) => void` | no | noop | Observes keyboard input. |

## Window context

Projected window content can read `WindowContext` to control its own window.
`manager` in this context is the current `ManagedWindowState`, not the manager
instance. The application-owned `WindowManager` remains available to the
portal/controller through the `manager` prop.

| Member | Description |
|---|---|
| `close(options?)` | Requests closure through the portal lifecycle. |
| `bringToFront(activate?)` | Reveals and brings the window forward. Pass `false` while dragging or resizing to preserve its active position. |
| `hide()` / `show()` | Hides or reveals the window. Managed windows update the manager's reactive `isHidden` state; unmanaged windows use local controller state. |
| `minimize()` | Reveals and minimizes the managed window. Returns `false` without a manager. |
| `maximize()` | Toggles a managed window between the portal workspace bounds and its previous bounds. Returns `false` without a manager or workspace. |
| `isActive` | Indicates whether this window is active in its manager. |
| `manager` | Current immutable `ManagedWindowState`, including `status`, `bounds`, and `isHidden`. |

The manager is optional. Existing modal and floating windows continue to work
without one; manager-specific commands then return `false`.

Modal renderers must contain focus, restore prior focus, expose `aria-modal`,
and include an obvious close control in the projected content. Floating
renderers must not begin a drag from interactive descendants; use
`data-window-no-drag` for custom interactive regions.

## Keyboard interaction

- Focus moves to the dialog when mounted.
- `Escape` closes when `closeOnEscape` is enabled.
- Modal windows keep `Tab` and `Shift+Tab` inside their focusable content.
- Focus returns to the previously focused element when unmounting.

## Accessibility notes

- The web renderer exposes a named `dialog`. `aria-modal` is set only in modal
  mode.
- The backdrop is a native `button` excluded from the tab order and
  accessibility tree.
- Dragging ignores buttons, links, form controls, and `[data-window-no-drag]`.
- Shared web styles keep a visible `:focus-visible` indicator and disable
  non-essential motion under `prefers-reduced-motion`.

## Known limitations

- Nested windows require distinct labels so dialog announcements remain
  understandable.
- A modal window still depends on its content to provide a visible close
  control.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Native renderer mapping

NativeScript maps the window to an accessible modal or floating native
container, uses native focus containment and restoration, and maps back-button
dismissal to the same close intent.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Dialog (Modal) pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- GOV.UK components: https://design-system.service.gov.uk/components/
