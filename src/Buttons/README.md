# Buttons

Buttons groups related action controls and gives the collection a shared
accessible name. Its rendering contract follows the WAI-ARIA Button pattern
for the grouped native buttons and targets WCAG 2.2 Level AA.

## When to use

Use Buttons when two or more actions belong to the same decision or workflow.
Keep the primary action first in the expected reading direction and avoid large
groups that make choices difficult to scan.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `"Button group"` | Supplies the group's accessible name. Applications should provide a task-specific label; pass an empty string to omit the group semantics. |
| `className` | `string` | no | `""` | Adds classes to the group wrapper. |
| `disabled` | `boolean` | no | - | Disables descendant Pastweb Button components and marks the group unavailable. |
| `id` | `string` | no | generated | Supplies the group ID. Generated IDs use the `buttons` prefix. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible label for the group. Empty labels are omitted. |
| `isDisabled` | `true \| undefined` | Is `true` when the group is disabled; otherwise omitted. Renderers use this value directly for `.is-disabled` and `aria-disabled`, and the Buttons context shares it with descendant Button mediators. |
| `role` | `'group' \| undefined` | Is `group` when `ariaLabel` supplies an accessible group name; otherwise omitted. |

## Mediator context

`buttonsMediator.getContext()` exposes a live value consumed by descendant
Button mediators.

| Property | Type | Description |
|---|---|---|
| `disabled` | `true \| undefined` | Normalized group disabled state combined with each Button's local `disabled` prop. |

## Slots

| SlotName | Description | Default content |
|---|---|---|
| default | Supplies the related Button controls in their intended reading and action order. | Empty. |

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-rounded` | Rounds the group's exposed first and last button corners. |
| `is-full-width` | Expands the group to the available width and distributes its buttons evenly. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Buttons_root_default_margin` | `root` | `default` | `margin` | `var(--pw_margin)` | Group outer spacing. | Web, Capacitor, NativeScript |
| `--pw_Buttons_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Outer button corner radius. | Web, Capacitor, NativeScript |
| `--pw_Buttons_root_rounded_border-radius` | `root` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Outer radius for rounded groups. | Web, Capacitor, NativeScript |
| `--pw_Buttons_color_default_box-shadow` | `color` | `default` | `box-shadow` | `var(--pw_color_box-shadow)` | First-button focus shadow colour. | Web, Capacitor |
| `--pw_Buttons_inset-color_default_box-shadow` | `inset-color` | `default` | `box-shadow` | `var(--pw_inset_color_box-shadow)` | First-button hover inset shadow colour. | Web, Capacitor |
| `--pw_Buttons_size_default_box-shadow` | `size` | `default` | `box-shadow` | `var(--pw_size_box-shadow)` | First-button shadow size. | Web, Capacitor |

```xts
import { setContext, useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/x';
import { BUTTONS_CONTEXT_KEY, buttonsMediator } from '@pastweb/components-core/Buttons';
import { DEFAULT_PROPS } from './constants';

export function Buttons(props: ButtonsProps) {
  const p = withDefaultProps<ButtonsDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ButtonsMediator>(buttonsMediator, p);
  const s = m.state;
  const c = m.getContext();
  setContext(BUTTONS_CONTEXT_KEY, c);
  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div
      id={m.id}
      class={p.cls('Buttons', p.className, { 'is-disabled': s.isDisabled })}
      role={s.role}
      aria-label={s.ariaLabel}
      aria-disabled={s.isDisabled}
    >
      <slot />
    </div>
  );
}
```

## Accessibility notes

- The wrapper uses `role="group"` only when `ariaLabel` provides a meaningful
  accessible name. The default is `"Button group"`; both attributes are omitted
  when an empty string is provided explicitly.
- Buttons retain their normal tab order and native keyboard behavior.
- Use a toolbar component with documented arrow-key behavior instead when the
  collection represents a persistent application toolbar.
- Keep one primary call to action in a group. Additional default buttons make
  the next step harder to identify.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Button pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
- GOV.UK Button guidance: https://design-system.service.gov.uk/components/button/
