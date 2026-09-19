# Select

Select chooses one value from a listbox attached to a trigger. The trigger is
either a styled native button (`content`) or a custom control (`target`). Its
rendering contract follows the WAI-ARIA Combobox/Listbox pattern and targets
WCAG 2.2 Level AA.

## When to use

Use Select when the user must pick one option from a known list. Do not use it
for free-text entry. Prefer a native radio group for a very small set of options
that should stay visible.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `id` | `string` | no | generated | Supplies the host ID. Generated IDs use the `select` prefix. |
| `ariaLabel` | `string` | no | `"Select an option"` | Names the trigger when there is no visible `label`. Pass an empty string to omit the accessible name. |
| `name` | `string` | no | - | Optional form name. |
| `label` | `string` | no | `""` | Visible label. When set, it names the trigger and `ariaLabel` is omitted. |
| `labelPlacement` | `Placement` | no | `"top-start"` | Places the visible label relative to the trigger. |
| `placeholder` | `string` | no | `"Select"` | Default text of the styled `content` trigger when that slot is empty. |
| `disabled` | `boolean` | no | `false` | Makes the Select unavailable. |
| `loading` | `boolean` | no | `false` | Marks the Select busy and unavailable. |
| `className` | `string` | no | `""` | Adds classes to the root. The `is-loading` class also enables loading. |
| `tabIndex` | `number` | no | `0` | Controls sequential keyboard focus order. |
| `value` | `any` | no | - | Controlled selected value. |
| `offset` | `number` | no | `3` | Listbox offset from the trigger. |
| `closeOnSelect` | `boolean` | no | `true` | Closes the listbox after a selection. |
| `hideOnClick` | `boolean` | no | `true` | Closes the listbox after activation inside the options. |
| `onChange` | `(value: any) => void` | no | noop | Reports the selected value. |

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-rounded` | Uses the rounded radius token on `.selectButton` and the listbox. Custom `target` triggers are not styled by this class. |
| `is-full-width` | Expands the Select to the available width. |

## Mediator API

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Resolved host ID. Generated IDs use the `select` prefix; an explicit `id` is exposed as `_${id}`. |
| `hide` | `() => void` | Closes the listbox. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized trigger accessible name. Omitted when `label` is set or `ariaLabel` is empty. |
| `highlightIndex` | `number \| null` | Keyboard highlight index in the listbox. |
| `inputId` | `string` | Root ID. Same value as mediator `id`. |
| `isDisabled` | `true \| undefined` | Is `true` when the Select is disabled; otherwise omitted. |
| `isLoading` | `true \| undefined` | Is `true` when the Select is loading; otherwise omitted. |
| `isOpen` | `boolean` | Whether the listbox is open. |
| `isUnavailable` | `true \| undefined` | Is `true` when disabled or loading. |
| `labelId` | `string` | Visible-label relationship ID in the form `label${id}`. |
| `listboxId` | `string` | Listbox relationship ID in the form `listbox${id}`. |
| `triggerId` | `string` | Trigger relationship ID in the form `trigger${id}`. |
| `value` | `any` | Current selected value. |

## Mediator context

SelectItem reads this API through the renderer context hook. Live getters stay synchronized with mediator state.

| Context property | Type | Description |
|---|---|---|
| `hide` | `() => void` | Closes the listbox. |
| `onChange` | `(value: any) => void` | Selects a value. |
| `onOptionKeyDown` | `(event, value, disabled?) => void` | Handles option keyboard activation. |
| `registerItem` | `() => number` | Registers a SelectItem and returns its index. |
| `state` | `SelectState` | Live mediator state for descendants. |

## Slots

Provide `content` for the styled button trigger, or `target` for a custom
trigger. Each trigger is mounted only when its slot has content. If neither
slot is provided, no trigger is rendered. Do not put another button inside
either trigger slot.

| SlotName | Description | Default content |
|---|---|---|
| `target` | Custom trigger. When present, wrapped in a `span.selectTarget` with `role="button"` and `display: contents`. Supply the visual trigger in the slot. | Empty. |
| `content` | Labelled content of the styled native-button trigger (`.selectButton`), which includes a decorative arrow. When present, the button is rendered. | `placeholder` |
| `options` | Supplies listbox options such as `SelectItem`. | Empty. |
| default | Supplies additional listbox content. | Empty. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Select_root_default_min-width` | `root` | `default` | `min-width` | `12em` | Minimum control width. The control can grow with trigger content. | Web, Capacitor, NativeScript |
| `--pw_Select_options_default_width` | `options` | `default` | `width` | `max-content` | Listbox width, sized to option content. | Web, Capacitor |
| `--pw_Select_options_default_max-height` | `options` | `default` | `max-height` | `16em` | Listbox max height; overflow scrolls vertically. | Web, Capacitor |
| `--pw_Select_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Control and listbox background. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_color` | `root` | `default` | `color` | `var(--pw_text_strong_color)` | Control and option foreground. | Web, Capacitor, NativeScript |
| `--pw_Select_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Visible label colour. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Listbox border colour. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Listbox border width. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Listbox border style. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Listbox corner radius. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_padding` | `root` | `default` | `padding` | `var(--pw_padding)` | Option padding. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_margin` | `root` | `default` | `margin` | vertical/horizontal margin | Outer spacing. | Web, Capacitor, NativeScript |
| `--pw_Select_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled opacity. | Web, Capacitor, NativeScript |

```tsx
import { setContext, useBeforeUnmount, useMediator, useMounted, useRef, useSlots, withDefaultProps } from '@pastweb/x';
import { selectMediator } from '@pastweb/components-core/Select';
import { DEFAULT_PROPS, SELECT_CONTEXT_KEY } from './constants';

export function Select(props: SelectProps) {
  const p = withDefaultProps<SelectDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SelectMediator>(selectMediator, p);
  const s = m.state;
  const c = m.getContext();
  const triggerRef = useRef(null);
  const listboxRef = useRef(null);
  const slots = useSlots();

  setContext(SELECT_CONTEXT_KEY, c);
  useMounted(() => {
    if (!triggerRef.value || !listboxRef.value) return;
    m.useMounted(triggerRef.value, listboxRef.value);
  });
  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div
      id={s.inputId}
      class={p.cls('Select', `label-${p.labelPlacement}`, p.className, {
        'is-disabled': s.isDisabled,
        'is-open': s.isOpen,
        'is-loading': s.isLoading,
      })}
    >
      <div class={p.cls('selectControl')}>
        <span
          #if={slots.target}
          #ref={triggerRef}
          role='button'
          class={p.cls('selectTarget')}
          tabIndex={p.tabIndex}
          aria-disabled={s.isUnavailable}
          aria-haspopup='listbox'
          aria-expanded={s.isOpen}
          aria-controls={s.listboxId}
          aria-labelledby={p.label ? s.labelId : undefined}
          aria-label={s.ariaLabel}
          aria-busy={s.isLoading || undefined}
          @keydown={m.onKeyDown}
          @click={m.onToggle}
        >
          <slot name='target' />
        </span>
        <button
          #if={slots.content}
          #ref={triggerRef}
          type='button'
          id={s.triggerId}
          class={p.cls('selectButton')}
          tabIndex={p.tabIndex}
          disabled={s.isUnavailable}
          aria-haspopup='listbox'
          aria-expanded={s.isOpen}
          aria-controls={s.listboxId}
          aria-labelledby={p.label ? s.labelId : undefined}
          aria-label={s.ariaLabel}
          aria-busy={s.isLoading || undefined}
          @keydown={m.onKeyDown}
          @click={m.onToggle}
        >
          <slot name='content'>{p.placeholder}</slot>
          <span class={p.cls('arrow')} aria-hidden='true'>▼</span>
        </button>
        <ul
          #ref={listboxRef}
          id={s.listboxId}
          role='listbox'
          class={p.cls('options')}
          aria-labelledby={p.label ? s.labelId : s.triggerId}
          hidden={!s.isOpen}
        >
          <slot name='options' />
          <slot />
        </ul>
      </div>
      <label #if={p.label} id={s.labelId} class={p.cls('label', p.labelPlacement)} for={s.triggerId}>
        {p.label}
      </label>
    </div>
  );
}
```

## Keyboard interaction

- `Enter` or `Space` on the trigger toggles the listbox.
- `ArrowDown` opens and highlights the first option, or moves down.
- `ArrowUp` opens and highlights the last option, or moves up.
- `Home` and `End` move to the first and last option while open.
- `Escape` closes an open listbox and restores trigger focus.
- `Tab` closes an open listbox and continues document order.

## Accessibility notes

- Provide either a `content` trigger or a `target` trigger. Each trigger exposes
  expanded, controls, disabled, and busy state.
- The `content` trigger is a native button with a decorative arrow. Do not place
  another button in the `content` slot.
- The `target` trigger is a `span` with `role="button"` and `display: contents`.
  Supply the visual trigger in the slot; do not nest another button.
- Visible `label` text is the accessible name. `ariaLabel` is used only when there is no visible label.
- The visible `label` is associated with the `content` button through `for` and
  `triggerId`. The `target` trigger is named with `aria-labelledby` when a
  visible label is present.
- Disabled and loading states are unavailable and cannot open the listbox.
- Closed options use `hidden` so they leave the accessibility tree and tab order.
- The listbox is sized to option content and at least as wide as the trigger. It
  flips only to the opposite edge when the viewport has no room below, and
  scrolls vertically when options exceed the max height.
- Shared web styles provide a visible focus indicator, forced-colours treatment,
  and reduced-motion behavior.

## Known limitations

- Content-slot and target-slot content should not introduce a nested button.
- Listbox positioning uses web layout measurement.
- Automated accessibility checks do not by themselves establish WCAG conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Combobox/Listbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- GOV.UK select: https://design-system.service.gov.uk/components/select/
