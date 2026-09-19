# Icon

Icon renders an inline SVG or image URL from a direct source, local collection,
or Iconify-compatible API. Its rendering contract targets WCAG 2.2 Level AA.

## When to use

Use Icon for a compact visual symbol. Icons are decorative by default. Supply
`ariaLabel` only when the icon communicates meaning that is not already present
in nearby text. Do not use an icon as an unlabeled interactive control. Prefer
a visible text label alongside an icon when the symbol is part of a control.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component classes. |
| `ariaLabel` | `string` | no | `""` | Names a meaningful icon and gives it the image role. Pass an empty string to keep the icon decorative. |
| `className` | `string` | no | `""` | Adds classes to the root. |
| `src` | `string` | no | `""` | Supplies an SVG string, image URL, or data URL. |
| `name` | `string` | no | `""` | Selects an icon using `collection:icon` syntax. |
| `collection` | `Collection` | no | `{}` | Supplies trusted local icon sources by collection and name. |
| `apiUrl` | `string` | no | `https://api.iconify.design` | Selects the Iconify-compatible API endpoint. |

SVG strings are injected as markup and therefore must come from trusted sources.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaHidden` | `true \| undefined` | Is `true` when the icon is decorative; otherwise omitted. Renderers use this value directly for `aria-hidden`. |
| `ariaLabel` | `string \| undefined` | Normalized accessible name. Empty labels are omitted. |
| `collectionName` | `string` | Collection segment parsed from `name`. |
| `iconData` | `IconData \| string` | Inline SVG markup when the source is an SVG string. |
| `iconName` | `string` | Icon segment parsed from `name`. |
| `role` | `'img' \| undefined` | Is `img` when `ariaLabel` supplies a name; otherwise omitted. |
| `src` | `string` | Image URL when the source is not inline SVG. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Icon_root_default_color` | `root` | `default` | `color` | `var(--pw_text_strong_color)` | Icon foreground. | Web, Capacitor, NativeScript |
| `--pw_Icon_graphic_default_width` | `graphic` | `default` | `width` | `1em` | Graphic width. | Web, Capacitor, NativeScript |
| `--pw_Icon_graphic_default_height` | `graphic` | `default` | `height` | `1em` | Graphic height. | Web, Capacitor, NativeScript |

```xts
import { useMediator, withDefaultProps } from '@pastweb/x';
import { iconMediator } from '@pastweb/components-core/Icon';
import { DEFAULT_PROPS } from './constants';

export function Icon(props: IconProps) {
  const p = withDefaultProps<IconDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<IconMediator>(iconMediator, p);
  const s = m.state;

  return (
    <i
      #if={s.iconData || s.src}
      class={p.cls('Icon', p.className)}
      role={s.role}
      aria-label={s.ariaLabel}
      aria-hidden={s.ariaHidden}
      #html={s.iconData || undefined}
    >
      <img #if={s.src} src={s.src} alt="" />
    </i>
  );
}
```

## Keyboard interaction

- Icon is not interactive. It does not enter the tab order.

## Accessibility notes

- Decorative icons are removed from the accessibility tree with `aria-hidden`.
- Meaningful icons expose `role="img"` and one accessible name on the root.
  Nested images use empty alternative text to prevent duplicate announcements.
- The default `ariaLabel` is an empty string, which keeps the icon decorative.
  Pass a task-specific name when the icon is meaningful.
- Icons used inside controls do not replace the control's visible or accessible
  label.

## Native renderer mapping

NativeScript renderers map trusted vector/image sources to supported native image
views. Decorative icons disable native accessibility exposure; meaningful icons
map `ariaLabel` intent to `accessibilityLabel` and image-role state. Do not copy
ARIA attributes into native markup.

## Known limitations

- Inline SVG markup must come from trusted sources.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Image pattern: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK images guidance: https://design-system.service.gov.uk/styles/images/
