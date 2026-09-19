# Walktour

Walktour guides a user through an ordered set of targets. The core package owns
the browser-portable state machine: navigation, controlled or uncontrolled
visibility, target measurement, event handling, step options, geometry
calculation, and interaction decisions. A framework renderer renders
`WalktourState`.

## When to use

Use Walktour for optional, short orientation flows that help people discover a
feature or a changed workflow. Keep each step focused on one action. Do not use
it for essential instructions, errors, or information a user must be able to
refer back to later; show that content in the interface instead.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves root and part classes in a renderer. |
| `steps` | `WalktourStep[]` | yes | - | Ordered guide steps. An empty list renders nothing. |
| `open` | `boolean` | no | `false` | Controlled visibility. Omit for mediator-managed visibility. |
| `initialStepIndex` | `number` | no | `0` | Initial zero-based step for `open()`. Out-of-range values are clamped. |
| `className` | `string` | no | `''` | Additional root classes. |
| `zIndex` | `number` | no | `1000` | Overlay stacking level used by web renderers. |
| `maskPadding` | `number` | no | `8` | Space around a target highlight in pixels. |
| `maskRadius` | `number` | no | `6` | Highlight corner radius in pixels. |
| `offset` | `number` | no | `12` | Gap between a target and the tour card in pixels. |
| `placement` | `WalktourPlacement` | no | `'bottom'` | Default card placement. |
| `disableMask` | `boolean` | no | `false` | Hides the dimmed mask and spotlight. |
| `disableMaskInteraction` | `boolean` | no | `false` | Prevents interaction with the highlighted target. |
| `closeOnMaskClick` | `boolean` | no | `false` | Lets an eligible mask activation close the tour. |
| `closeOnEscape` | `boolean` | no | `true` | Lets Escape close an eligible tour step. |
| `scrollIntoView` | `boolean` | no | `true` | Asks web renderers to scroll the current target into view. |
| `nextLabel` | `string` | no | `'Next'` | Default next control label. The last step uses `Finish`. |
| `previousLabel` | `string` | no | `'Back'` | Default previous control label. |
| `closeLabel` | `string` | no | `'Skip'` | Default close control label. |
| `onOpenChange` | `(open: boolean) => void` | no | - | Reports requested visibility changes. |
| `onStepChange` | `(index, step) => void` | no | - | Reports a completed step change. |
| `onComplete` | `() => void` | no | - | Runs before the final step closes. |
| `onClose` | `() => void` | no | - | Runs whenever the mediator requests closure. |

`WalktourPlacement` is `'top' | 'right' | 'bottom' | 'left' | 'center'`.
When a target cannot be resolved, the card uses the centred placement.

## Core usage

Pass a framework-neutral element reference for every step that should highlight
an element. The reference must expose its current element through `value`.
Steps without `ref` intentionally render as centred, targetless steps.

```xts
const saveButton = ref<HTMLElement | null>(null);

const steps: WalktourStep[] = [
  {
    ref: saveButton,
    title: 'Save changes',
    description: 'Select Save when you are ready to publish your updates.',
    placement: 'top',
  },
  {
    title: 'You are ready',
    description: 'Your changes can now be reviewed.',
    placement: 'center',
  },
];
```

The core component is renderer-neutral. A framework package maps its own ref
type to this contract and is responsible only for rendering `WalktourState`.

## Step options

| Property | Type | Description |
|---|---|---|
| `ref` | `{ value: HTMLElement \| null }` | Framework-neutral element reference. Omit it for a centred, targetless step. React adapters accept `RefObject<HTMLElement \| null>`. |
| `title` / `description` | renderer content | Content rendered by the framework adapter. `description` is required. |
| `placement`, `maskPadding`, `maskRadius`, `offset` | step override | Override the matching component default for this step. |
| `nextLabel`, `previousLabel`, `closeLabel` | `string` | Override a control label for this step. |
| `disableNext`, `disablePrevious`, `disableClose` | `boolean` | Removes the matching navigation action. |
| `nextOnTargetClick` | `boolean` | Advances through the mediator when the renderer reports a target activation. |

## Renderer implementation

`walktourMediator` composes reactive state and effects. Stateless helpers in
`utils/` perform navigation, state updates, geometry calculation, target
resolution, and listener setup with explicit props, state, and mutable vars.
This keeps those helpers reusable and avoids creating internal action factories
for every Walktour instance.

The mediator resolves the active target reference, measures the target element,
subscribes to resize, scroll, keyboard, and target-click events, and cleans
them up when unmounted. A browser framework renderer creates the mediator,
connects its lifecycle methods, and renders the mediator state:

```xts
import { Render, useBeforeUnmount, useMediator, useMounted, withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS, walktourMediator } from '@pastweb/components-core/Walktour';

export function Walktour(props: WalktourProps) {
  const p = withDefaultProps<WalktourDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<WalktourMediator>(walktourMediator, p);
  const s = m.state;

  useMounted(m.useMounted);
  useBeforeUnmount(m.useBeforeUnmount);

  if (!s.isOpen || !s.step) return null;

  return (
    <div class={p.cls('Walktour', p.className)} #style={{ zIndex: p.zIndex }} aria-live="polite">
      <fragment #if={s.isMaskVisible && s.hole}>
        <button class={p.cls('maskPiece')} type="button" tabindex={-1} aria-hidden="true"
          #style={{ top: 0, left: 0, right: 0, height: s.hole.top }} @click={m.onMaskClick} />
        <button class={p.cls('maskPiece')} type="button" tabindex={-1} aria-hidden="true"
          #style={{ top: s.hole.bottom, left: 0, right: 0, bottom: 0 }} @click={m.onMaskClick} />
        <button class={p.cls('maskPiece')} type="button" tabindex={-1} aria-hidden="true"
          #style={{ top: s.hole.top, left: 0, width: s.hole.left, height: s.hole.bottom - s.hole.top }} @click={m.onMaskClick} />
        <button class={p.cls('maskPiece')} type="button" tabindex={-1} aria-hidden="true"
          #style={{ top: s.hole.top, left: s.hole.right, right: 0, height: s.hole.bottom - s.hole.top }} @click={m.onMaskClick} />
        <div class={p.cls('spotlight')} #style={{
          top: s.hole.top, left: s.hole.left, width: s.hole.right - s.hole.left,
          height: s.hole.bottom - s.hole.top, borderRadius: s.maskRadius,
          pointerEvents: s.isTargetInteractionDisabled ? 'auto' : 'none',
        }} @click={s.isTargetInteractionDisabled ? m.onMaskClick : undefined} />
      </fragment>
      <button #if={s.isMaskVisible && !s.hole} class={p.cls('maskPiece')}
        type="button" tabindex={-1} aria-hidden="true" #style={{ inset: 0 }} @click={m.onMaskClick} />
      <section class={p.cls('card')} #style={s.cardPosition} role="dialog" aria-modal="true"
        aria-label={typeof s.step.title === 'string' ? s.step.title : 'Guided tour'}>
        <h2 #if={s.step.title} class={p.cls('title')}><Render content={s.step.title} /></h2>
        <div class={p.cls('description')}><Render content={s.step.description} /></div>
        <footer class={p.cls('footer')}>
          <span class={p.cls('progress')}>{s.stepIndex + 1} / {p.steps.length}</span>
          <button #if={s.canClose} class={p.cls('button')} type="button" @click={m.close}>{s.closeLabel}</button>
          <button #if={s.canPrevious} class={p.cls('button')} type="button" @click={m.previous}>{s.previousLabel}</button>
          <button #if={s.canNext} class={p.cls('button')} type="button" @click={m.next}>{s.nextLabel}</button>
        </footer>
      </section>
    </div>
  );
}
```

The mediator exposes `open`, `close`, `next`, and `previous`, plus lifecycle
methods. It performs all clamping, callback invocation, per-step option
precedence, target measurement, scrolling, and close eligibility checks.

## Mediator state

| Property | Description |
|---|---|
| `isOpen`, `stepIndex`, `step` | Visibility and current resolved step. |
| `targetRect`, `hole` | Target and viewport-clipped mask geometry. |
| `cardPosition` | Renderer-ready `top`, `left`, and `transform` card position. |
| `maskPadding`, `maskRadius` | Resolved visual values for the active step. |
| `isMaskVisible`, `isTargetInteractionDisabled` | Resolved mask interaction state. |
| `canClose`, `canPrevious`, `canNext` | Renderer-ready control availability. |
| `closeLabel`, `previousLabel`, `nextLabel` | Renderer-ready active-step labels. |

## CSS Variables

| Variable | Part | Default | Description |
|---|---|---|---|
| `--pw_Walktour_mask_default_background-color` | mask | `rgba(0, 0, 0, 0.5)` | Dimmed overlay colour. |
| `--pw_Walktour_card_default_background-color` | card | `var(--pw_background-color)` | Card background. |
| `--pw_Walktour_card_default_color` | card | `var(--pw_text_color)` | Card text colour. |
| `--pw_Walktour_card_default_border-radius` | card | `var(--pw_border-radius)` | Card corner radius. |
| `--pw_Walktour_card_default_box-shadow` | card | elevation shadow | Card elevation. |
| `--pw_Walktour_step_default_transition-duration` | mask, spotlight, card | `320ms` | Geometry transition duration between steps. |

Web styles honour `prefers-reduced-motion` by disabling the step transition.

Portal integration is application-specific and belongs in a framework or app
wrapper, not in this core renderer contract.

## Accessibility notes

- Web renderers expose the card as a labelled modal dialog and announce changes
  through a polite live region.
- Escape is handled through `onKeyDown` only when `closeOnEscape` and
  `canClose` are both true.
- Renderers should make mask controls non-focusable or otherwise ensure they do
  not add unnecessary tab stops.
- A step without a target remains usable because the card is centred.
- Native renderers should provide an equivalent mediator implementation for
  their native target, viewport, scrolling, and accessibility APIs.
