# DropDown

DropDown reveals contextual content from a trigger. Its rendering contract
follows the WAI-ARIA Disclosure pattern and targets WCAG 2.2 Level AA.

## When to use

Use DropDown for short contextual content or a collection of actions associated
with a trigger. Do not use hover-only activation for essential content. Use a
dialog when the revealed content requires a modal task or a complex form.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `id` | `string` | no | generated | Supplies the stable base for trigger and content IDs. Generated IDs use the `dropDown` prefix. |
| `ariaLabel` | `string` | no | `"DropDown"` | Names the trigger when its visible content does not provide a name. Pass an empty string to omit the accessible name. |
| `arrow` | `boolean` | no | `true` | Displays the visual arrow. |
| `className` | `string` | no | `""` | Adds classes to the root. |
| `contentClassName` | `string` | no | `""` | Adds classes to the revealed content. |
| `offset` | `number` | no | `2` | Sets the renderer positioning offset. |
| `disabled` | `boolean` | no | `false` | Prevents the content from opening. |
| `isVisible` | `boolean` | no | `false` | Controls the requested visibility. |
| `visibleOn` | `'click' \| 'over' \| 'context'` | no | `'click'` | Selects the activation model. Essential content must remain available without hover or a context-menu gesture. |
| `visibleTarget` | `'element' \| 'pointer'` | no | `'element'` | Selects the positioning reference. `element` uses the trigger. `pointer` uses the pointer position from the trigger event. Keyboard and programmatic opens fall back to the trigger. |
| `placement` | `Placement` | no | `'bottom'` | Requests placement relative to the trigger. |
| `hideOnClick` | `boolean` | no | `true` | Closes after activation inside the revealed content. |
| `hideOnClickOut` | `boolean` | no | `true` | Closes after a click or context-menu activation outside the component. |
| `hideOnBlur` | `boolean` | no | `true` | Closes when focus leaves the component. |
| `position` | `'absolute' \| 'fixed'` | no | `'absolute'` | Selects the web positioning strategy. |
| `clickTimeGap` | `number` | no | `16` | Delays click/context activation in milliseconds. |
| `onChange` | `(isVisible: boolean) => void` | no | noop | Reports visibility changes. |
| `onClick` | `() => void` | no | noop | Reports click activation. |
| `onContext` | `() => void` | no | noop | Reports context-menu activation. |
| `onClickOut` | `() => void` | no | noop | Reports an outside activation that closed the content. |
| `onMouseEnter` | `() => void` | no | noop | Reports hover open. |
| `onMouseLeave` | `() => void` | no | noop | Reports hover close. |

## Mediator API

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Resolved host ID. Generated IDs use the `dropDown` prefix; an explicit `id` is exposed as `_${id}`. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized trigger accessible name. Empty labels are omitted. |
| `contentId` | `string` | Content relationship ID in the form `content${id}`. |
| `isDisabled` | `true \| undefined` | Is `true` when the DropDown is disabled; otherwise omitted. Renderers use this value directly for `.is-disabled`, `aria-disabled`, and unavailable keyboard behavior. |
| `isVisible` | `boolean` | Whether the content is requested open. Renderers use this for `.is-open`, `.is-visible`, `aria-expanded`, and `hidden`. |
| `triggerId` | `string` | Trigger relationship ID in the form `trigger${id}`. |

## Mediator context

Descendant or replacement-slot content reads this API through the renderer context hook. Live getters stay synchronized with mediator state.

| Context property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized trigger accessible name. |
| `arrow` | `boolean` | Whether the decorative arrow is requested. |
| `cls` | `(...args: ClassValue[]) => string` | Resolves component classes. |
| `contentClassName` | `string` | Classes added to the revealed content. |
| `contentId` | `string` | Content relationship ID. |
| `hide` | `() => void` | Closes the DropDown. Nested menus should call this from item activation. |
| `id` | `string` | Resolved host ID. |
| `isDisabled` | `true \| undefined` | Normalized disabled state. |
| `isVisible` | `boolean` | Whether the content is requested open. |
| `onClick` | `(event?) => void` | Toggles click-activated content. |
| `onKeyDown` | `(event) => void` | Handles Enter, Space, and Escape. |
| `position` | `'absolute' \| 'fixed'` | Web positioning strategy. |
| `setArrowRef` | `(arrow?) => void` | Stores the mounted arrow reference. |
| `triggerId` | `string` | Trigger relationship ID. |

## Slots

| SlotName | Description | Default content |
|---|---|---|
| default | Supplies the trigger content. | Empty. |
| `header` | Supplies optional leading content inside the revealed panel. | Empty. |
| `content` | Supplies the main revealed content. | Empty. |
| `footer` | Supplies optional trailing content inside the revealed panel. | Empty. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_DropDown_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled opacity. | Web, Capacitor, NativeScript |
| `--pw_DropDown_content_default_background-color` | `content` | `default` | `background-color` | `var(--pw_control_background-color)` | Revealed-content background. | Web, Capacitor, NativeScript |
| `--pw_DropDown_content_default_color` | `content` | `default` | `color` | `var(--pw_text_color)` | Content foreground. | Web, Capacitor, NativeScript |
| `--pw_DropDown_content_default_border-color` | `content` | `default` | `border-color` | `var(--pw_border-color)` | Content border colour. | Web, Capacitor, NativeScript |
| `--pw_DropDown_content_default_border-width` | `content` | `default` | `border-width` | `var(--pw_border-width)` | Content border width. | Web, Capacitor, NativeScript |
| `--pw_DropDown_content_default_border-style` | `content` | `default` | `border-style` | `var(--pw_border-style)` | Content border style. | Web, Capacitor, NativeScript |
| `--pw_DropDown_content_default_border-radius` | `content` | `default` | `border-radius` | `var(--pw_small_border-radius)` | Content corner radius. | Web, Capacitor, NativeScript |
| `--pw_DropDown_content_default_padding` | `content` | `default` | `padding` | `var(--pw_padding) 0` | Content spacing. | Web, Capacitor, NativeScript |
| `--pw_DropDown_content_default_box-shadow` | `content` | `default` | `box-shadow` | shared shadow | Floating-content elevation. | Web, Capacitor |
| `--pw_DropDown_arrow_default_border-width` | `arrow` | `default` | `border-width` | `1em` | Arrow triangle size. | Web, Capacitor |
| `--pw_DropDown_target_default_min-width` | `target` | `default` | `min-width` | `2.75em` | Minimum target width. | Web, Capacitor, NativeScript |
| `--pw_DropDown_target_default_min-height` | `target` | `default` | `min-height` | `2.75em` | Minimum target height. | Web, Capacitor, NativeScript |
| `--pw_DropDown_target_focus-visible_box-shadow` | `target` | `focus-visible` | `box-shadow` | shared focus shadow | Keyboard focus indicator. | Web, Capacitor |

```xts
import {
  setContext,
  useBeforeUnmount,
  useMediator,
  useMounted,
  useRef,
  withDefaultProps,
} from '@pastweb/x';
import { dropdownMediator } from '@pastweb/components-core/DropDown';
import { DEFAULT_PROPS, DROPDOWN_CONTEXT_KEY } from './constants';

export function DropDown(props: DropDownProps) {
  const p = withDefaultProps<DropDownDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<DropDownMediator>(dropdownMediator, p);
  const s = m.state;
  const c = m.getContext();
  const rootRef = useRef(null);
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const arrowRef = useRef(null);

  setContext(DROPDOWN_CONTEXT_KEY, c);
  useMounted(() => {
    if (
      !rootRef.value
      || !targetRef.value
      || !containerRef.value
      || !contentRef.value
    ) return;

    m.useMounted(
      rootRef.value,
      targetRef.value,
      containerRef.value,
      contentRef.value,
    );
    if (arrowRef.value) m.setArrowRef(arrowRef.value);
  });
  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div
      #ref={rootRef}
      id={m.id}
      class={p.cls('DropDown', p.className, {
        'is-disabled': s.isDisabled,
        'is-open': s.isVisible,
      })}
      @click={m.onClick}
      @contextmenu={m.onContext}
      @mouseenter={m.onMouseEnter}
      @mouseleave={m.onMouseLeave}
      @blur={m.onBlur}
    >
      <span
        #ref={targetRef}
        id={s.triggerId}
        class={p.cls('target')}
        role="button"
        tabIndex={s.isDisabled ? -1 : 0}
        aria-label={s.ariaLabel}
        aria-haspopup="true"
        aria-expanded={s.isVisible}
        aria-controls={s.contentId}
        aria-disabled={s.isDisabled}
        @keydown={m.onKeyDown}
      >
        <slot />
        <div
          #ref={containerRef}
          class={p.cls('container', { 'is-visible': s.isVisible })}
          style={{ position: p.position }}
          aria-hidden={!s.isVisible || undefined}
          inert={!s.isVisible || undefined}
        >
          <div
            #ref={contentRef}
            id={s.contentId}
            class={p.cls('content', p.contentClassName)}
            aria-labelledby={s.triggerId}
            @click={m.onClick}
          >
            <slot name="header" />
            <slot name="content" />
            <slot name="footer" />
          </div>
          <div #if={p.arrow} #ref={arrowRef} class={p.cls('arrow')} aria-hidden="true">
            <div class={p.cls('triangle')} />
          </div>
        </div>
      </span>
    </div>
  );
}
```

## Keyboard interaction

- `Tab` and `Shift+Tab` move focus to and from the trigger in document order.
- `Enter` or `Space` on the trigger toggles click-activated content.
- A click on the trigger hides context-activated content when it is already open.
- `Escape` closes open content.

## Accessibility notes

- The trigger exposes expanded, disabled, and ID relationship state.
- Closed content is `inert` and `aria-hidden` so it is removed from keyboard and
  accessibility navigation. Do not rely on opacity alone.
- Hover-only activation is not sufficient for essential content.
- The decorative arrow is hidden from assistive technology.
- Shared web styles provide at least a 44 by 44 CSS-pixel target and a visible
  focus indicator.

## Native renderer mapping

NativeScript renderers map the trigger to a focusable native control, visibility
to the native hidden/collapsed state, and expanded/disabled intent to native
accessibility state. Positioning, outside activation, and animation completion
remain renderer responsibilities and require iOS and Android device testing.

## Known limitations

- Positioning uses web layout measurement. Native renderers must supply an
  equivalent placement adapter.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Disclosure pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- GOV.UK Details guidance: https://design-system.service.gov.uk/components/details/
