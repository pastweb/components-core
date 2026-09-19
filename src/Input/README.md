# Input

Input renders a labelled native text, search, password, email, or number field
with optional affixes, loading state, and number step controls. Its rendering
contract targets WCAG 2.2 Level AA.

## When to use

Use Input for short, single-line values. Use TextArea for multi-line content and
a purpose-built control for dates or constrained choices. A visible label is
preferred; placeholders do not replace labels.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component, part, and state classes. |
| `ariaLabel` | `string` | no | `"Input"` | Names the input when no visible `label` is supplied. Pass an empty string to omit the accessible name, including when an external label is associated through `id`. |
| `className` | `string` | no | `""` | Adds classes to the root. The `is-loading` class is also treated as a loading signal. |
| `autocomplete` | `string` | no | - | Supplies the native autocomplete token. Use it for personal data and sign-in fields. |
| `tabIndex` | `number` | no | `0` | Controls sequential focus order. Prefer document order. |
| `type` | `'text' \| 'search' \| 'password' \| 'email' \| 'number'` | no | `'text'` | Selects native input behavior. |
| `placeholder` | `string` | no | `""` | Supplies a short input hint. Do not use it as the only label. |
| `disabled` | `boolean` | no | `false` | Makes the field unavailable. |
| `loading` | `boolean` | no | `false` | Marks the field busy and temporarily unavailable. |
| `required` | `boolean` | no | `false` | Marks the value as required. |
| `name` | `string` | no | - | Supplies the form field name. |
| `id` | `string` | no | generated | Supplies the native input ID. Generated IDs use the `input` prefix. |
| `min` | `number` | no | - | Native minimum for number inputs. |
| `max` | `number` | no | - | Native maximum for number inputs. |
| `step` | `number` | no | - | Native step for number inputs. |
| `value` | `string` | no | - | Controls the input value. |
| `label` | `string` | no | `""` | Supplies the visible accessible label. |
| `labelPlacement` | `Placement` | no | `'top-start'` | Positions the visible label. |
| `incrementTitle` | `string` | no | `"Increment"` | Names the optional number increment control. |
| `decrementTitle` | `string` | no | `"Decrement"` | Names the optional number decrement control. |
| `onChange` | `(value: string, event?: unknown) => void` | no | noop | Reports value input. Programmatic number stepping has no renderer event. |
| `onKeyDown` | `(event) => void` | no | noop | Reports available-field keyboard input. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name when no visible `label` is present. Empty labels are omitted. |
| `disableDownBtn` | `true \| undefined` | Is `true` when the number value is at `min`; otherwise omitted. |
| `disableUpBtn` | `true \| undefined` | Is `true` when the number value is at `max`; otherwise omitted. |
| `inputId` | `string` | Native input ID from an explicit `id` or a generated `input` prefix. |
| `isDisabled` | `true \| undefined` | Is `true` when the Input is disabled; otherwise omitted. Renderers use this value directly for `.is-disabled`, `aria-disabled`, and native `disabled` when loading is not also blocking the field. |
| `isLoading` | `true \| undefined` | Is `true` when the Input is busy; otherwise omitted. Renderers use this value directly for `.is-loading` and `aria-busy`. |

## Slots

| SlotName | Description | Default content |
|---|---|---|
| `left` | Supplies a leading affix inside `.leftComponent`. | Empty. |
| `right` | Supplies a trailing affix inside `.rightComponent`. | Empty. |
| `loading` | Supplies the politely announced busy status. | A `loading` status region containing `Loading...`. |

Affix content is not automatically decorative. Renderers must preserve an
interactive affix's accessible name and keyboard behavior. Decorative icons in
an affix should be marked `aria-hidden` by the consumer.

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-rounded` | Uses the rounded input radius token. |
| `is-full-width` | Expands the field to the available width. |
| `is-outlined` | Inverts affix icon colour against the control background. |
| `is-loading` | Compatibility signal for the loading state. Prefer the `loading` prop. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Input_root_default_margin` | `root` | `default` | `margin` | `var(--pw_vertical_margin)` | Component spacing. | Web, Capacitor, NativeScript |
| `--pw_Input_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled opacity. | Web, Capacitor, NativeScript |
| `--pw_Input_container_default_min-width` | `container` | `default` | `min-width` | `5em` | Minimum control width. | Web, Capacitor, NativeScript |
| `--pw_Input_container_default_min-height` | `container` | `default` | `min-height` | `2.75em` | Minimum control height, with a 44px web target. | Web, Capacitor, NativeScript |
| `--pw_Input_container_default_background-color` | `container` | `default` | `background-color` | `var(--pw_control_background-color)` | Control background. | Web, Capacitor, NativeScript |
| `--pw_Input_container_default_color` | `container` | `default` | `color` | `var(--pw_text_color)` | Input and affix foreground. | Web, Capacitor, NativeScript |
| `--pw_Input_container_default_border-color` | `container` | `default` | `border-color` | `var(--pw_border-color)` | Control border colour. | Web, Capacitor, NativeScript |
| `--pw_Input_container_default_border-width` | `container` | `default` | `border-width` | `var(--pw_border-width)` | Control border width. | Web, Capacitor, NativeScript |
| `--pw_Input_container_default_border-style` | `container` | `default` | `border-style` | `var(--pw_border-style)` | Control border style. | Web, Capacitor, NativeScript |
| `--pw_Input_container_default_border-radius` | `container` | `default` | `border-radius` | `var(--pw_border-radius)` | Control corner radius. | Web, Capacitor, NativeScript |
| `--pw_Input_container_rounded_border-radius` | `container` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Rounded variant radius. | Web, Capacitor, NativeScript |
| `--pw_Input_container_hover_box-shadow` | `container` | `hover` | `box-shadow` | shared inset shadow | Pointer hover treatment. | Web, Capacitor |
| `--pw_Input_container_focus-visible_box-shadow` | `container` | `focus-visible` | `box-shadow` | shared focus shadow | Keyboard focus treatment. | Web, Capacitor |
| `--pw_Input_container_default_transition-duration` | `container` | `default` | `transition-duration` | `var(--pw_transition-duration)` | Visual state duration. | Web, Capacitor; NativeScript adapter |
| `--pw_Input_input_default_padding` | `input` | `default` | `padding` | `var(--pw_padding)` | Input spacing. | Web, Capacitor, NativeScript |
| `--pw_Input_input_default_font-size` | `input` | `default` | `font-size` | `var(--pw_font-size)` | Input text size. | Web, Capacitor, NativeScript |
| `--pw_Input_input_default_font-weight` | `input` | `default` | `font-weight` | `var(--pw_font-weight)` | Input text weight. | Web, Capacitor, NativeScript |
| `--pw_Input_affix_default_padding` | `affix` | `default` | `padding` | `var(--pw_horizontal_padding)` | Affix spacing. | Web, Capacitor, NativeScript |
| `--pw_Input_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Label foreground. | Web, Capacitor, NativeScript |
| `--pw_Input_label_default_font-size` | `label` | `default` | `font-size` | `var(--pw_font-size)` | Label font size. | Web, Capacitor, NativeScript |
| `--pw_Input_label_default_font-weight` | `label` | `default` | `font-weight` | `var(--pw_semibold_font-weight)` | Label weight. | Web, Capacitor, NativeScript |
| `--pw_Input_number-buttons_default_width` | `number-buttons` | `default` | `width` | `2em` | Step-control column width. | Web, Capacitor, NativeScript |
| `--pw_Input_number-button_default_min-height` | `number-button` | `default` | `min-height` | `1.5em` | Step-control minimum height. | Web, Capacitor, NativeScript |
| `--pw_Input_number-button_default_font-size` | `number-button` | `default` | `font-size` | `0.813em` | Step-control glyph size. | Web, Capacitor, NativeScript |

```xts
import {
  useBeforeUnmount,
  useMediator,
  useMounted,
  useRef,
  withDefaultProps,
} from '@pastweb/x';
import { inputMediator } from '@pastweb/components-core/Input';
import { DEFAULT_PROPS } from './constants';

export function Input(props: InputProps) {
  const p = withDefaultProps<InputDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<InputMediator>(inputMediator, p);
  const s = m.state;
  const inputRef = useRef(null);

  useMounted(() => m.useMounted(inputRef.value));
  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div
      class={p.cls('Input', `label-${p.labelPlacement}`, p.className, {
        'is-disabled': s.isDisabled,
        'is-loading': s.isLoading,
      })}
      aria-busy={s.isLoading}
    >
      <div class={p.cls('inputContainer')}>
        <slot name="left" map={content => <span class={p.cls('leftComponent')}>{content}</span>} />
        <input
          #ref={inputRef}
          class={p.cls('inputElement')}
          type={p.type}
          tabIndex={p.tabIndex}
          autocomplete={p.autocomplete}
          placeholder={p.placeholder}
          disabled={s.isDisabled || s.isLoading}
          aria-disabled={s.isDisabled}
          name={p.name}
          id={s.inputId}
          value={p.value}
          required={p.required}
          max={p.max}
          min={p.min}
          step={p.step}
          aria-label={s.ariaLabel}
          @input={event => m.onChange(event.target.value, event)}
          @keydown={m.onKeyDown}
        />
        <div #if={p.type === 'number'} class={p.cls('number-buttons')}>
          <button type="button" class={p.cls('number-btn')} @click={m.stepUp} disabled={s.isDisabled || s.isLoading || s.disableUpBtn} aria-label={p.incrementTitle}>▲</button>
          <button type="button" class={p.cls('number-btn')} @click={m.stepDown} disabled={s.isDisabled || s.isLoading || s.disableDownBtn} aria-label={p.decrementTitle}>▼</button>
        </div>
        <slot name="right" map={content => <span class={p.cls('rightComponent')}>{content}</span>} />
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

- `Tab` and `Shift+Tab` move focus to and from the native input in document order.
- Printable keys, `Backspace`, and `Delete` edit the value through native input
  behavior.
- `ArrowUp` and `ArrowDown` on a number input use native stepping. The mediator
  does not duplicate those keys.
- Number-step buttons are `type="button"` and are operable with `Enter` or
  `Space` when available.

## Accessibility notes

- The native input supplies keyboard, form, validation, and autocomplete behavior.
- The visible label and generated or explicit ID remain connected.
- When visible label text is absent, the mediator exposes `ariaLabel`. The
  default name is `Input`. An explicit empty string omits the name so an
  external label can name the control through `for` and `id`.
- Disabled inputs use `.is-disabled`, the native `disabled` property, and
  `aria-disabled="true"`.
- Loading inputs use `.is-loading`, `aria-busy="true"`, and native `disabled`.
  Number-step buttons mirror the same unavailable state.
- Native Arrow Up and Arrow Down behavior is not duplicated by the mediator.
- Shared web styles provide at least a 44 by 44 CSS-pixel text-field target,
  visible keyboard focus, forced-colours treatment, and reduced-motion behavior.

## Native renderer mapping

NativeScript renderers map the contract to the appropriate editable native view,
keyboard type, secure-entry state, form constraints, label relationship, busy
state, and native accessibility name. Web DOM refs and events are renderer
details. Do not copy ARIA attributes into native markup.

## Known limitations

- Placeholders do not replace a visible or accessible name.
- Hint and error text are not built in. Associate them with the native input
  through `id` when the surrounding form provides that content.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Textbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK text input guidance: https://design-system.service.gov.uk/components/text-input/
