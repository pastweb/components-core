# Link

Link renders a native anchor for navigation and prevents unavailable links from
remaining actionable or focusable. Its rendering contract follows the WAI-ARIA
Link pattern and targets WCAG 2.2 Level AA.

## When to use

Use Link to navigate to another resource or location. Use Button for actions on
the current page. Link text should describe its destination without relying on
surrounding text such as “click here.”

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `href` | `string` | no | `"#"` | Supplies the destination. Prefer a real URL. |
| `className` | `string` | no | `""` | Adds classes to the anchor. |
| `disabled` | `boolean` | no | - | Removes navigation and sequential focus. |
| `target` | `'_self' \| '_blank'` | no | `'_self'` | Selects the browsing context. New-window links must communicate that behavior in their accessible content. |
| `id` | `string` | no | - | Supplies the anchor ID. |
| `onClick` | `(event: unknown) => void` | no | noop | Reports available-link activation. Renderers may narrow the event type. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `isDisabled` | `true \| undefined` | Is `true` when the link is unavailable; otherwise omitted. Renderers use this value directly for `.is-disabled`, `aria-disabled`, omitted `href`, and `tabIndex={-1}`. |

## Slots

| SlotName | Description | Default content |
|---|---|---|
| default | Supplies descriptive link content. | Empty. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Link_root_default_color` | `root` | `default` | `color` | `var(--pw_link_color)` | Link foreground. | Web, Capacitor, NativeScript |
| `--pw_Link_root_hover_color` | `root` | `hover` | `color` | `var(--pw_link_hover_color)` | Pointer hover foreground. | Web, Capacitor |
| `--pw_Link_root_default_font-size` | `root` | `default` | `font-size` | `var(--pw_link_font-size)` | Link text size. | Web, Capacitor, NativeScript |
| `--pw_Link_root_default_font-weight` | `root` | `default` | `font-weight` | `var(--pw_link_font-weight)` | Link text weight. | Web, Capacitor, NativeScript |
| `--pw_Link_root_default_line-height` | `root` | `default` | `line-height` | `var(--pw_link_line-height)` | Link line height. | Web, Capacitor, NativeScript |
| `--pw_Link_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled opacity. | Web, Capacitor, NativeScript |

```xts
import { useMediator, withDefaultProps } from '@pastweb/x';
import { linkMediator } from '@pastweb/components-core/Link';
import { DEFAULT_PROPS } from './constants';

export function Link(props: LinkProps) {
  const p = withDefaultProps<LinkDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<LinkMediator>(linkMediator, p);
  const s = m.state;

  return (
    <a
      class={p.cls('Link', p.className, { 'is-disabled': s.isDisabled })}
      href={s.isDisabled ? undefined : p.href}
      target={p.target}
      rel={p.target === '_blank' ? 'noopener noreferrer' : undefined}
      id={p.id}
      aria-disabled={s.isDisabled}
      tabIndex={s.isDisabled ? -1 : undefined}
      @click={m.onClick}
    >
      <slot />
    </a>
  );
}
```

## Keyboard interaction

- Available links retain native anchor keyboard activation, typically `Enter`.
- `Tab` and `Shift+Tab` move sequential focus to available links. Disabled
  links leave the tab order.

## Accessibility notes

- Available links retain native anchor semantics and keyboard activation.
- Disabled links omit `href`, expose `aria-disabled="true"`, leave sequential
  focus, and prevent activation in the mediator.
- Links opening a new browsing context use `noopener noreferrer`; their content
  should also tell users that a new tab or window will open.
- Shared web styles keep underlining, visible keyboard focus, and
  forced-colours treatment.

## Native renderer mapping

NativeScript renderers map the destination to native URL navigation, unavailable
state to native enabled/focus/accessibility properties, and external navigation
to the platform link-opening service. Do not copy ARIA attributes into native
markup.

## Known limitations

- Placeholders such as `href="#"` do not describe a destination.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Link pattern: https://www.w3.org/WAI/ARIA/apg/patterns/link/
- GOV.UK links guidance: https://www.gov.uk/guidance/content-design/links
