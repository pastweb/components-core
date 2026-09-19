# TextArea

TextArea is a labelled multiline text control with explicit disabled, read-only,
required, resizable, and loading states. Its rendering contract targets WCAG
2.2 Level AA.

## When to use

Use TextArea for multi-line values. Use Input for a single line. Prefer a
visible label; placeholders do not replace labels. If there is a good reason to
limit length, associate a character-count message through `id` rather than
relying on `maxLength` alone.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component, part, and state classes. |
| `ariaLabel` | `string` | no | `"TextArea"` | Names the field when no visible `label` is supplied. Pass an empty string to omit it. |
| `className` | `string` | no | `""` | Additional root classes. The `is-loading` class is also treated as a loading signal. |
| `cols` | `number` | no | - | Native column count. |
| `disabled` | `boolean` | no | `false` | Makes the field unavailable. |
| `id` | `string` | no | generated | Native textarea ID. Generated IDs use the `textArea` prefix. |
| `label` | `string` | no | `""` | Visible accessible label. |
| `labelPlacement` | `Placement` | no | `'top-start'` | Visual label placement. |
| `loading` | `boolean` | no | `false` | Marks the field busy and temporarily unavailable. |
| `maxLength` | `number` | no | - | Native maximum character length. |
| `name` | `string` | no | - | Native form name. |
| `onChange` | `(value: string) => void` | no | noop | Reports edited text. |
| `placeholder` | `string` | no | `""` | Short input hint. Do not use it as the only label. |
| `readOnly` | `boolean` | no | `false` | Prevents editing and applies `is-readonly`. |
| `required` | `boolean` | no | `false` | Marks the value as required. |
| `resizeable` | `boolean` | no | `false` | Enables two-axis web resizing and `is-resizeable`. |
| `rows` | `number` | no | - | Native row count. |
| `tabIndex` | `number` | no | `0` | Sequential focus order. Prefer document order. |
| `value` | `string` | no | `""` | Controlled value. |

The named `loading` slot defaults to “Loading...”.

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-rounded` | Uses the rounded control radius token. |
| `is-full-width` | Expands the field to the available width. |
| `is-loading` | Compatibility signal for the loading state. Prefer the `loading` prop. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name when no visible `label` is present. Empty labels are omitted. |
| `inputId` | `string` | Native textarea ID from an explicit `id` or a generated `textArea` prefix. |
| `isDisabled` | `true \| undefined` | Is `true` when disabled; otherwise omitted. |
| `isLoading` | `true \| undefined` | Is `true` when busy; otherwise omitted. |
| `isReadOnly` | `true \| undefined` | Is `true` when read-only; otherwise omitted. |
| `isResizeable` | `true \| undefined` | Is `true` when resizing is enabled; otherwise omitted. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_TextArea_root_default_margin` | `root` | `default` | `margin` | shared margins | Component spacing. | Web, Capacitor, NativeScript |
| `--pw_TextArea_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled appearance. | Web, Capacitor, NativeScript |
| `--pw_TextArea_control_default_min-height` | `control` | `default` | `min-height` | `2.75em` | Minimum control height, with a 44px web target. | Web, Capacitor, NativeScript |
| `--pw_TextArea_root_default_background-color` | `control` | `default` | `background-color` | `var(--pw_control_background-color)` | Control background. | Web, Capacitor, NativeScript |
| `--pw_TextArea_root_default_color` | `control` | `default` | `color` | `var(--pw_text_color)` | Control foreground. | Web, Capacitor, NativeScript |
| `--pw_TextArea_root_default_border-color` | `control` | `default` | `border-color` | `var(--pw_border-color)` | Border colour. | Web, Capacitor, NativeScript |
| `--pw_TextArea_root_default_border-radius` | `control` | `default` | `border-radius` | `var(--pw_border-radius)` | Corner radius. | Web, Capacitor, NativeScript |
| `--pw_TextArea_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Label colour. | Web, Capacitor, NativeScript |
| `--pw_TextArea_loading_default_background-color` | `loading` | `default` | `background-color` | control background | Loading overlay. | Web, Capacitor, NativeScript |

```xts
import { useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/x';
import { textAreaMediator } from '@pastweb/components-core/TextArea';
import { DEFAULT_PROPS } from './constants';

export function TextArea(props: TextAreaProps) {
  const p = withDefaultProps<TextAreaDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TextAreaMediator>(textAreaMediator, p);
  const s = m.state;

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div class={p.cls('TextArea', `label-${p.labelPlacement}`, {
      'is-disabled': s.isDisabled, 'is-loading': s.isLoading, 'is-readonly': s.isReadOnly, 'is-resizeable': s.isResizeable,
    }, p.className)} aria-busy={s.isLoading}>
      <div class={p.cls('textarea')}>
        <textarea id={s.inputId} class={p.cls('input')} disabled={s.isDisabled || s.isLoading} readonly={s.isReadOnly}
          required={p.required} value={p.value} aria-label={s.ariaLabel} aria-busy={s.isLoading} aria-disabled={s.isDisabled}
          @change={event => m.onChange(event.target.value)} />
        <div #if={s.isLoading} class={p.cls('loading')} role="status" aria-live="polite">
          <slot name="loading">Loading...</slot>
        </div>
      </div>
      <label #if={p.label} class={p.cls('label', p.labelPlacement)} for={s.inputId}>{p.label}</label>
    </div>
  );
}
```

## Keyboard interaction

- Printable keys, `Backspace`, and `Delete` edit the value through native
  textarea behavior.
- `Tab` and `Shift+Tab` move sequential focus.

## Accessibility notes

- The native textarea supplies keyboard, form, and validation behavior.
- Visible `label` text is connected through `for`/`id`. When it is absent,
  `ariaLabel` names the field. The default name is `TextArea`.
- Disabled fields use `.is-disabled`, native `disabled`, and `aria-disabled`.
- Loading disables the field, applies `aria-busy`, and displays a polite status
  region.
- Shared web styles provide at least a 44 by 44 CSS-pixel target, visible
  `:focus-visible` indication, forced-colours treatment, and reduced-motion
  behavior.

## Native renderer mapping

Native renderers use a multiline editable text view. Do not copy ARIA attributes
into native markup.

## Known limitations

- Placeholders do not replace a visible or accessible name.
- Hint, error, and character-count text are not built in. Associate them with
  the native textarea through `id` when the surrounding form provides that
  content.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Textbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK textarea: https://design-system.service.gov.uk/components/textarea/
