# Accordion

Accordion presents related sections whose content can be expanded and collapsed.
Its rendering contract follows the WAI-ARIA Accordion pattern and targets WCAG
2.2 Level AA.

## When to use

Use an accordion when research shows that users benefit from seeing an overview
of several related sections and selectively revealing their content. Do not use
it for content every user must read, for a sequence of form questions, or inside
another accordion. Prefer ordinary headings, links to page sections, separate
pages, or native `details` elements when those are simpler.

## Accordion props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `"Accordion"` | Labels the accordion group. Provide a task-specific label when possible; pass an empty string to omit the group semantics. |
| `className` | `string` | no | `""` | Adds classes to the accordion wrapper. |
| `disabled` | `boolean` | no | - | Disables every panel trigger. Prefer removing unavailable sections or explaining their unavailable content. |
| `id` | `string` | no | - | Supplies the root ID. |
| `rtl` | `boolean` | no | - | Enables right-to-left layout. |
| `transitionDuration` | `number` | no | `500` | Default panel transition duration in milliseconds. |

## Accordion mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name. An empty string is stored as `undefined` so the group role and label are omitted. |
| `isDisabled` | `true \| undefined` | Normalized disabled state. Renderers must use this value for the root `is-disabled` class, `aria-disabled`, and must never convert `false`. |
| `role` | `'group' \| undefined` | Group role present only when `ariaLabel` is a non-empty string. |

## Accordion mediator context

`accordionMediator.getContext()` exposes live getters consumed by each
`AccordionPanel`. Values that also exist on mediator state are read from that
normalized state rather than recomputed from raw props.

| Property | Type | Description |
|---|---|---|
| `className` | `string` | Root classes inherited by every panel for coordinated styling. |
| `disabled` | `true \| undefined` | Normalized accordion disabled state. |
| `rtl` | `boolean` | Root text-direction preference combined with each panel's local `rtl` prop. |
| `transitionDuration` | `number` | Default panel transition duration in milliseconds. |

## Accordion slots

| SlotName | Description | Default content |
|---|---|---|
| default | Supplies the ordered `AccordionPanel` children rendered inside the accordion wrapper. | Empty. |

## CSS Variables

Accordion variables follow the
`--pw_<ComponentName>_<part>_<state>_<css-property>` token grammar. The
component name is PascalCase; part and state names are lowercase kebab case.

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Accordion_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_background-color)` | Panel background colour. | Web, Capacitor, NativeScript |
| `--pw_Accordion_root_default_color` | `root` | `default` | `color` | `var(--pw_text_color)` | Default accordion text colour. | Web, Capacitor, NativeScript |
| `--pw_Accordion_root_default_font-size` | `root` | `default` | `font-size` | `var(--pw_font-size)` | Base accordion font size. | Web, Capacitor, NativeScript |
| `--pw_Accordion_root_default_line-height` | `root` | `default` | `line-height` | `var(--pw_line-height)` | Base accordion line height. | Web, Capacitor, NativeScript |
| `--pw_Accordion_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Border colour used by the wrapper and panel separators. | Web, Capacitor, NativeScript |
| `--pw_Accordion_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Border width used by the wrapper and panel separators. | Web, Capacitor, NativeScript |
| `--pw_Accordion_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Border style used by the wrapper and panel separators. | Web, Capacitor, NativeScript |
| `--pw_Accordion_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Outer accordion corner radius. | Web, Capacitor, NativeScript |
| `--pw_Accordion_root_default_border` | `root` | `default` | `border` | width, style and colour tokens | Composed border shorthand. | Web, Capacitor, NativeScript |
| `--pw_Accordion_root_default_transition-duration` | `root` | `default` | `transition-duration` | `0.5s` | Duration of panel open and close transitions. | Web, Capacitor; NativeScript adapter |
| `--pw_Accordion_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled accordion opacity. Descendant panels reset their own opacity to avoid compounding it. | Web, Capacitor, NativeScript |
| `--pw_Accordion_header_default_padding` | `header` | `default` | `padding` | `var(--pw_padding)` | Space inside the panel trigger. | Web, Capacitor, NativeScript |
| `--pw_Accordion_header_default_background-color` | `header` | `default` | `background-color` | `var(--pw_control_background-color)` | Default trigger background colour. | Web, Capacitor, NativeScript |
| `--pw_Accordion_header_default_color` | `header` | `default` | `color` | `var(--pw_text_strong_color)` | Trigger text and icon colour. | Web, Capacitor, NativeScript |
| `--pw_Accordion_header_default_font-size` | `header` | `default` | `font-size` | `1em` | Trigger font size. | Web, Capacitor, NativeScript |
| `--pw_Accordion_header_default_font-weight` | `header` | `default` | `font-weight` | `var(--bold_font-weight)` | Trigger font weight. | Web, Capacitor, NativeScript |
| `--pw_Accordion_header_default_line-height` | `header` | `default` | `line-height` | `var(--pw_line-height)` | Trigger line height. | Web, Capacitor, NativeScript |
| `--pw_Accordion_header_disabled_opacity` | `header` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Opacity of an individually disabled panel. | Web, Capacitor, NativeScript |
| `--pw_Accordion_close-button_default_background-color` | `close-button` | `default` | `background-color` | header background token | Default expand/collapse icon background. | Web, Capacitor, NativeScript |
| `--pw_Accordion_close-button_hover_background-color` | `close-button` | `hover` | `background-color` | header colour token | Expand/collapse icon background while the web trigger is hovered. | Web, Capacitor |
| `--pw_Accordion_close-bar_default_background-color` | `close-bar` | `default` | `background-color` | header colour token | Default expand/collapse icon bar colour. | Web, Capacitor, NativeScript |
| `--pw_Accordion_close-bar_hover_background-color` | `close-bar` | `hover` | `background-color` | header background token | Expand/collapse icon bar colour while the web trigger is hovered. | Web, Capacitor |
| `--pw_Accordion_content_default_padding` | `content` | `default` | `padding` | header padding token | Space inside expanded panel content. | Web, Capacitor, NativeScript |

```xts
// Accordion
import { setContext, useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/x';
import { accordionMediator } from '@pastweb/components-core/Accordion';
import { DEFAULT_PROPS, ACCORDION_CONTEXT_KEY } from './constants';

export function Accordion(props: AccordionProps) {
  const p = withDefaultProps<AccordionDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<AccordionMediator>(accordionMediator, p);
  const s = m.state;
  const c = m.getContext();

  setContext(ACCORDION_CONTEXT_KEY, c);
  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div
      id={m.id}
      class={p.cls('Accordion', p.className, { 'is-disabled': s.isDisabled })}
      role={s.role}
      aria-label={s.ariaLabel}
      aria-disabled={s.isDisabled}
    >
      <slot />
    </div>
  );
}
```

## AccordionPanel props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `className` | `string` | no | `""` | Adds classes to the panel. |
| `disabled` | `boolean` | no | - | Disables the native trigger button. |
| `headingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | no | `2` | Web renderer property. Selects the heading level required by the surrounding document. |
| `id` | `string` | no | generated | Supplies the stable base ID used for trigger and panel relationships. |
| `isOpen` | `boolean` | no | - | Sets the panel's initial open state. |
| `landmark` | `boolean` | no | - | Gives the content `role="region"`. Enable selectively to avoid landmark proliferation. |
| `onOpenChange` | `(isOpen: boolean) => void` | no | - | Reports a user-requested state change. |
| `title` | `string \| number` | no | `""` | Provides the default accessible trigger content. |
| `rtl` | `boolean` | no | - | Enables right-to-left layout for this panel. |
| `transitionDuration` | `number` | no | `500` | Sets this panel's transition duration in milliseconds. |

## AccordionPanel mediator state

| Property | Type | Description |
|---|---|---|
| `className` | `string` | Complete panel class name, including inherited Accordion classes and `is-disabled` / `is-open`. |
| `hideBorderBottom` | `boolean` | Indicates that the closed panel trigger should hide its bottom border after the close transition. |
| `isDisabled` | `true \| undefined` | Normalized disabled state from the panel or parent Accordion. Renderers must use this value for `disabled`, `aria-disabled`, and must never convert `false`. |
| `isOpen` | `boolean` | Current expanded state. |
| `isRtl` | `true \| undefined` | Normalized right-to-left layout from the panel or parent Accordion. |
| `role` | `'region' \| undefined` | Optional landmark role when `landmark` is enabled. |
| `transitionDuration` | `string` | CSS duration used by the open and close transition. |

## AccordionPanel slots

| SlotName | Description | Default content |
|---|---|---|
| `header` | Replaces content inside the native trigger button. It does not replace the heading or button. | The title and decorative expand/collapse icon. |
| default | Supplies panel content. | Empty. |

Custom header content must provide a meaningful accessible name. Decorative
icons must use `aria-hidden="true"`.

```xts
// AccordionPanel
import {
  useBeforeUnmount,
  useMediator,
  useMounted,
  withDefaultProps,
} from '@pastweb/x';
import { accordionPanelMediator } from '@pastweb/components-core/Accordion';
import { DEFAULT_ACCORDION_PANEL_PROPS } from './constants';

export function AccordionPanel(props: AccordionPanelProps) {
  const p = withDefaultProps<AccordionPanelDefaultProps>(props, DEFAULT_ACCORDION_PANEL_PROPS);
  const m = useMediator<AccordionPanelMediator>(accordionPanelMediator, p);
  const s = m.state;
  const Heading = `h${p.headingLevel}`;

  useMounted(trigger => {
    m.useMounted({ focus: () => trigger.focus() });
  });
  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <section
      id={m.id}
      class={s.className}
      dir={s.isRtl ? 'rtl' : undefined}
      aria-disabled={s.isDisabled}
      style={{
        transitionDuration: s.transitionDuration,
        '--pw_Accordion_root_default_transition-duration': s.transitionDuration,
      }}
    >
      <Heading class={p.cls('heading')}>
        <button
          id={m.triggerId}
          type="button"
          class={p.cls('header', { rtl: s.isRtl, 'hide-border': s.hideBorderBottom })}
          aria-expanded={s.isOpen}
          aria-controls={m.panelId}
          disabled={s.isDisabled}
          @click={m.onToggle}
        >
          <slot name="header">
            <span class={p.cls('title')}>
              <render content={p.title} />
            </span>
            <span class={p.cls('closeButton', s.isOpen ? 'is-open' : '')} aria-hidden="true">
              <span class={p.cls('closeBar')} />
              <span class={p.cls('closeBar')} />
            </span>
          </slot>
        </button>
      </Heading>

      <div
        id={m.panelId}
        class={p.cls('container', s.isOpen ? 'is-open' : '')}
        role={s.role}
        aria-labelledby={m.triggerId}
        aria-hidden={!s.isOpen}
        inert={!s.isOpen}
        @transitionend={m.onTransitionEnd}
      >
        <div class={p.cls('contentWrapper')}>
          <div class={p.cls('content')}>
            <slot />
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Keyboard interaction

- `Tab` and `Shift+Tab` move through panel triggers and focusable open content in normal document order.
- `Enter` or `Space` on a trigger toggles its panel through native button behavior.
- Collapsed panel content is removed from sequential focus navigation.

## Accessibility notes

- The trigger is a native button inside a native heading.
- `aria-expanded` communicates state, while `aria-controls` and
  `aria-labelledby` establish the trigger/content relationship.
- Closing content becomes inert and hidden from the accessibility tree
  immediately. Web renderers keep it mounted so the grid-row transition can
  animate the real content height in both directions.
- `role="region"` is opt-in because repeated regions can create excessive
  landmarks.
- Shared styles retain visible focus, support `forced-colors`, and disable
  non-essential transitions under `prefers-reduced-motion`.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Accordion pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
- GOV.UK Accordion guidance: https://design-system.service.gov.uk/components/accordion/
