# ScrollArea

ScrollArea provides a named, keyboard-focusable viewport for overflowing
content. Its rendering contract targets WCAG 2.2 Level AA.

## When to use

Use it when content must remain within a bounded layout. Avoid nested scroll
areas and never hide an axis when that would make content unreachable.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and part classes. |
| `ariaLabel` | `string` | no | `"Scrollable content"` | Names the region. Pass an empty string to omit the name. Prefer a specific label. |
| `id` | `string` | no | - | Root ID. |
| `className` | `string` | no | `""` | Additional root classes. |
| `hideX` | `boolean` | no | `false` | Applies `hide-x` and suppresses horizontal overflow. |
| `hideY` | `boolean` | no | `false` | Applies `hide-y` and suppresses vertical overflow. |
| `scrollRight` | `boolean` | no | `false` | Applies `scroll-right` and requests initial horizontal end alignment. |
| `scrollBottom` | `boolean` | no | `false` | Applies `scroll-bottom` and requests initial vertical end alignment. |
| `contentPadding` | `number \| string` | no | - | Inline padding scoped to `.content`. |
| `tabIndex` | `number` | no | `0` | Makes the scroll viewport keyboard focusable. |

The default slot supplies scrollable content.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized region name. Empty labels are omitted. |

`getContentStyle()` returns `{ padding }` when `contentPadding` is provided,
including `0`. `getScrollAlignment()` returns semantic `start` or `end` axes
for the renderer to apply after layout.

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_ScrollArea_content_default_scrollbar-color` | `content` | `default` | `scrollbar-color` | `#e3e3e3 transparent` | Standards scrollbar colours. | Web, Capacitor |
| `--pw_ScrollArea_content_default_scrollbar-width` | `content` | `default` | `scrollbar-width` | `thin` | Standards scrollbar width. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar_default_width` | `scrollbar` | `default` | `width` | `12px` | WebKit vertical width. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar_default_height` | `scrollbar` | `default` | `height` | `12px` | WebKit horizontal height. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-track_default_background-color` | `scrollbar-track` | `default` | `background-color` | `#fcfcfc` | Track colour. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-thumb_default_background-color` | `scrollbar-thumb` | `default` | `background-color` | `#dfdfdf` | Thumb colour. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-thumb_hover_background-color` | `scrollbar-thumb` | `hover` | `background-color` | `#7a7a7a` | Hover thumb colour. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-thumb_default_border-radius` | `scrollbar-thumb` | `default` | `border-radius` | `6px` | Thumb corners. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-corner_default_background-color` | `scrollbar-corner` | `default` | `background-color` | `#fbfbfb` | Corner colour. | Web, Capacitor |

```xts
import { useMediator, useMounted, useRef, withDefaultProps } from '@pastweb/x';
import { scrollAreaMediator } from '@pastweb/components-core/ScrollArea';
import { DEFAULT_PROPS } from './constants';

export function ScrollArea(props: ScrollAreaProps) {
  const p = withDefaultProps<ScrollAreaDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ScrollAreaMediator>(scrollAreaMediator, p);
  const s = m.state;
  const content = useRef();

  useMounted(() => {
    const alignment = m.getScrollAlignment();
    if (alignment.horizontal === 'end') content.value.scrollLeft = content.value.scrollWidth - content.value.clientWidth;
    if (alignment.vertical === 'end') content.value.scrollTop = content.value.scrollHeight - content.value.clientHeight;
  });

  return (
    <div id={p.id} class={p.cls('ScrollArea', {
      'hide-x': p.hideX, 'hide-y': p.hideY,
      'scroll-bottom': p.scrollBottom, 'scroll-right': p.scrollRight,
    }, p.className)}>
      <div #ref={content} class={p.cls('content')} #style={m.getContentStyle()}
        role="region" aria-label={s.ariaLabel} tabindex={p.tabIndex}><slot /></div>
    </div>
  );
}
```

## Keyboard interaction

- `Tab` and `Shift+Tab` move sequential focus to the named viewport.
- Arrow keys, `PageUp`, `PageDown`, `Home`, and `End` scroll native overflow
  when the viewport is focused.

## Accessibility notes

- The web viewport is a named `region` and is keyboard focusable.
- Renderers consume `getScrollAlignment()` after layout instead of reversing
  visual content order.
- Hiding an axis must not make content unreachable.
- Shared web styles provide a visible `:focus-visible` indicator.

## Known limitations

- Nested scroll areas make keyboard scrolling harder to discover.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA landmark regions: https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/
- GOV.UK components: https://design-system.service.gov.uk/components/
