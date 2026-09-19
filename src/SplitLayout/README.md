# SplitLayout

SplitLayout arranges resizable panels separated by pointer- and keyboard-operable
controls. Its rendering contract follows the WAI-ARIA Window Splitter pattern
and targets WCAG 2.2 Level AA.

## When to use

Use it when users benefit from allocating space between adjacent work areas.
Avoid it for ordinary responsive page columns, and provide a stacked alternative
when a small viewport cannot support the minimum panel sizes.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves classes. |
| `ariaLabel` | `string` | no | `'Resizable panels'` | Names the panel group. Pass an empty string to omit the name. |
| `className` | `string` | no | `''` | Additional root classes. |
| `orientation` | `'horizontal' \| 'vertical'` | no | `'horizontal'` | Panel and separator axis. |
| `sizes` | `number[]` | no | equal | Relative percentages normalized to total 100. |
| `minSize` | `number` | no | `10` | Minimum percentage for each adjacent panel. |
| `keyboardStep` | `number` | no | `2` | Percentage moved per arrow-key activation. |
| `disabled` | `boolean` | no | `false` | Prevents resizing and applies `is-disabled`. |
| `onSizesChange` | `(sizes: number[]) => void` | no | noop | Reports normalized percentages after resizing. |

`SplitLayoutItem` accepts `id`, `ariaLabel`, and `className`. Only
`SplitLayoutItem` children are supported.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `activeSeparator` | `number \| null` | Index of the separator currently being resized. |
| `ariaLabel` | `string \| undefined` | Normalized group name. Empty labels are omitted. |
| `isDisabled` | `true \| undefined` | Is `true` when resizing is unavailable; otherwise omitted. |
| `itemCount` | `number` | Registered pane count. |
| `sizes` | `number[]` | Normalized pane percentages totalling 100. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_SplitLayout_root_default_width` | `root` | `default` | `width` | `100%` | Layout width. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_root_default_height` | `root` | `default` | `height` | `100%` | Layout height. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_root_disabled_opacity` | `root` | `disabled` | `opacity` | shared disabled opacity | Disabled appearance. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_pane_default_background-color` | `pane` | `default` | `background-color` | transparent | Panel background. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_splitter_default_width` | `splitter` | `default` | `width` | `0.2em` | Horizontal visual splitter width. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_splitter_default_height` | `splitter` | `default` | `height` | `0.2em` | Vertical visual splitter height. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_splitter_default_background-color` | `splitter` | `default` | `background-color` | border colour | Splitter colour. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_splitter_hover_background-color` | `splitter` | `hover` | `background-color` | strong text | Hover colour. | Web, Capacitor |
| `--pw_SplitLayout_splitter_default_border-color` | `splitter` | `default` | `border-color` | shared border | Splitter border colour. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_splitter_default_border-style` | `splitter` | `default` | `border-style` | shared border style | Splitter border style. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_splitter_default_border-width` | `splitter` | `default` | `border-width` | shared border width | Splitter border width. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_splitter_default_outline` | `splitter` | `default` | `outline` | shared outline | Keyboard focus indicator. | Web, Capacitor |
| `--pw_SplitLayout_splitter-target_default_width` | `splitter-target` | `default` | `width` | `2.75em` | Horizontal pointer target width. | Web, Capacitor, NativeScript |
| `--pw_SplitLayout_splitter-target_default_height` | `splitter-target` | `default` | `height` | `2.75em` | Vertical pointer target height. | Web, Capacitor, NativeScript |

```xts
import { setContext, useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/x';
import { splitLayoutMediator, SPLIT_LAYOUT_CONTEXT_KEY } from '@pastweb/components-core/SplitLayout';
import { DEFAULT_PROPS } from './constants';

export function SplitLayout(props: SplitLayoutProps) {
  const p = withDefaultProps<SplitLayoutDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SplitLayoutMediator>(splitLayoutMediator, p);
  const s = m.state;
  const c = m.getContext();

  m.setItemCount(props.children.length);
  setContext(SPLIT_LAYOUT_CONTEXT_KEY, c);
  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div class={p.cls('SplitLayout', p.orientation, {
      'is-disabled': s.isDisabled, 'is-resizing': s.activeSeparator !== null,
    }, p.className)} role="group" aria-label={s.ariaLabel}>
      <slot />
    </div>
  );
}
```

## Keyboard interaction

- A horizontal panel layout has vertical separators and uses `ArrowLeft` and
  `ArrowRight`.
- A vertical panel layout has horizontal separators and uses `ArrowUp` and
  `ArrowDown`.
- `Home` moves the preceding panel to its minimum.
- `End` moves the following panel to its minimum.
- Separators expose orientation and current, minimum, and maximum percentage
  values.

## Accessibility notes

- The layout is a named group. Each separator is a focusable `separator` with
  `aria-controls`, `aria-orientation`, and current/min/max values.
- Disabled state is reflected through `.is-disabled` and removes separator
  operation.
- Pointer targets remain at least 44 CSS pixels even when the visible splitter
  is thinner.

## Known limitations

- Percentages describe the pane proportions within the space left after
  splitters; very small containers can therefore produce a physical pane size
  slightly below the percentage calculated against the full container.
- The component does not yet observe container resizing or automatically switch
  orientation at responsive breakpoints.
- Nested layouts require distinct labels so separator announcements remain
  understandable.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Window Splitter pattern: https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
- GOV.UK components: https://design-system.service.gov.uk/components/
