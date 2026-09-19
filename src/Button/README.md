# Button

Button renders a native action control with independent disabled and loading
states. Its rendering contract follows the WAI-ARIA Button pattern and targets
WCAG 2.2 Level AA.

## When to use

Use a button to perform an action on the current page. Use a link when activation
navigates to another location. Button labels should start with a clear verb and
describe the result of activation.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `className` | `string` | no | `""` | Adds classes to the native button. The legacy `is-loading` class continues to enable loading behavior. |
| `disabled` | `boolean` | no | `false` | Makes the action unavailable. |
| `id` | `string` | no | generated | Supplies the button ID. Generated IDs use the `button` prefix. |
| `loading` | `boolean` | no | `false` | Marks the action busy, suppresses its click handler, and displays the loading slot without disabling the native button. |
| `onClick` | `(event: unknown) => void` | no | noop | Handles an available button activation. Renderers may narrow the event type. |
| `tabIndex` | `number` | no | `0` | Controls sequential keyboard focus order. Prefer the default document order. |
| `type` | `'button' \| 'submit' \| 'reset'` | no | `'button'` | Selects native button behavior. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `isDisabled` | `true \| undefined` | Is `true` when the button or its Buttons context is disabled; otherwise omitted. Renderers use this value directly for `.is-disabled`, `disabled`, and `aria-disabled`. |
| `isLoading` | `boolean` | Indicates loading independently from `isDisabled`. Loading suppresses the click handler without disabling the native button. |

## Mediator context

Button does not publish its own context. When rendered inside `Buttons`, its
mediator optionally consumes the parent `ButtonsContext` value below and
combines it with the local `disabled` prop.

| Context property | Type | Description |
|---|---|---|
| `disabled` | `true \| undefined` | Normalized disabled state inherited from the containing Buttons component. |

## Slots

| SlotName | Description | Default content |
|---|---|---|
| default | Supplies the button's accessible label and optional icon content. | Empty. |
| `loading` | Supplies status content while `loading` is active. | `Loading...` |

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-rounded` | Uses the rounded button radius token. |
| `is-full-width` | Expands the button to the available width. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Button_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Button background. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_color` | `root` | `default` | `color` | `var(--pw_text_strong_color)` | Button text colour. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_padding` | `root` | `default` | `padding` | `var(--pw_padding)` | Inner spacing. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_margin` | `root` | `default` | `margin` | `var(--pw_margin)` | Outer spacing. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Default border colour. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Border width. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Border style. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Default corner radius. | Web, Capacitor, NativeScript |
| `--pw_Button_root_rounded_border-radius` | `root` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Corner radius for `is-rounded`. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_transition-duration` | `root` | `default` | `transition-duration` | `var(--pw_transition-duration)` | Visual state transition duration. | Web, Capacitor; NativeScript adapter |
| `--pw_Button_color_default_box-shadow` | `color` | `default` | `box-shadow` | `var(--pw_color_box-shadow)` | Focus shadow colour. | Web, Capacitor |
| `--pw_Button_inset-color_default_box-shadow` | `inset-color` | `default` | `box-shadow` | `var(--pw_inset_color_box-shadow)` | Hover inset shadow colour. | Web, Capacitor |
| `--pw_Button_size_default_box-shadow` | `size` | `default` | `box-shadow` | `var(--pw_size_box-shadow)` | Shadow size. | Web, Capacitor |
| `--pw_Button_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled opacity. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_font-size` | `root` | `default` | `font-size` | `var(--pw_font-size)` | Label font size. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_font-weight` | `root` | `default` | `font-weight` | `var(--pw_semibold_font-weight)` | Label font weight. | Web, Capacitor, NativeScript |
| `--pw_Button_root_default_line-height` | `root` | `default` | `line-height` | `var(--pw_line-height)` | Label line height. | Web, Capacitor, NativeScript |
| `--pw_Button_item_default_gap` | `item` | `default` | `gap` | `var(--pw_horizontal_padding)` | Spacing between rendered items. | Web, Capacitor |
| `--pw_Button_icon_default_color` | `icon` | `default` | `color` | button colour | Icon colour. | Web, Capacitor, NativeScript |
| `--pw_Button_icon_default_stroke` | `icon` | `default` | `stroke` | icon colour | Icon stroke. | Web, Capacitor |
| `--pw_Button_icon_default_size` | `icon` | `default` | `size` | `var(--pw_icon_size)` | Font-icon size. | Web, Capacitor, NativeScript |

```xts
import { useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/x';
import { buttonMediator } from '@pastweb/components-core/Button';
import { DEFAULT_PROPS } from './constants';

export function Button(props: ButtonProps) {
  const p = withDefaultProps<ButtonDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ButtonMediator>(buttonMediator, p);
  const s = m.state;

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <button
      id={m.id}
      type={p.type}
      class={p.cls('Button', p.className, { 'is-disabled': s.isDisabled, 'is-loading': s.isLoading })}
      @click={m.onClick}
      disabled={s.isDisabled}
      aria-disabled={s.isDisabled}
      aria-busy={s.isLoading || undefined}
      tabIndex={p.tabIndex}
    >
      <slot
        map={(child, index) => (
          <span key={index} class={p.cls('item')}>{child}</span>
        )}
      />
      <span #if={s.isLoading} class={p.cls('loading')} role="status" aria-live="polite">
        <slot name="loading">Loading...</slot>
      </span>
    </button>
  );
}
```

## Accessibility notes

- The renderer must use a native button and preserve its keyboard activation.
- Disabled buttons use the native `disabled` property, `aria-disabled="true"`,
  and the `is-disabled` class.
- Loading buttons remain independently enabled, expose `aria-busy="true"` and
  the `is-loading` class, and suppress the component click handler. Status
  content is announced politely.
- A button may be both disabled and loading when both states are set.
- The accessible name must remain meaningful without relying on a decorative icon.
- Shared web styles provide at least a 44 by 44 CSS-pixel target, visible focus,
  forced-colours treatment, and reduced-motion behavior.

## Keyboard interaction

- `Tab` and `Shift+Tab` move focus to and from the native button in document order.
- `Enter` or `Space` activates the button through native button behavior.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Button pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
- GOV.UK Button guidance: https://design-system.service.gov.uk/components/button/
