# `@pastweb/components-core` implementation skills

This document contains the detailed workflow for extending the framework-neutral
component contracts. It complements `AGENTS.md` and applies to component changes,
mediators, styles, templates, tests, and documentation.

## Start with the complete component contract

Before changing a component, read its types, defaults, mediator, helper modules,
README, XJS/XTS template, styles, and renderer integrations. Treat these as one
contract. A change is complete only when the public API, normalized mediator
state, templates, CSS tokens, tests, and every affected renderer agree.

Keep the least capable accessible behavior as the default. Features such as
collapsibility, multiple selection, persistence, or landmark regions must be
explicit in the public contract. Name callbacks after intent (`onToggle`,
`onOpen`, `onClose`) rather than a particular input method unless the behavior is
genuinely pointer-specific.

## Organize helpers and modules

- Exported helpers and helpers moved into shared utility modules require TSDoc
  with at least one `@example` using the public import path.
- If a helper needs helper-specific constants or types, give it a directory with
  an `index.ts` barrel, `constants.ts`, and `types.ts`.
- When `utils.ts` exceeds roughly 200 lines, replace it with a `utils/` directory
  containing an `index.ts` barrel and one file per helper.
- When a function module exceeds roughly 50 lines because of helper logic, move
  those helpers into a sibling `utils.ts` and keep the public entry point focused.
- Type exported object constants directly on the declaration:

  ```ts
  export const DEFAULT_PROPS: Partial<MyComponentDefaultProps> = {
    className: '',
  };
  ```

- Keep constants in constant case, public types in PascalCase, and avoid copying
  default values into both a mediator and a renderer.

## Implement mediators in a framework-neutral way

Mediators may model semantic state and interaction intent, but must not import
React, Vue, browser renderers, NativeScript views, Capacitor plugins, private
packages, or DOM/platform APIs. Do not expose `Event`, `HTMLElement`, CSSOM,
`TransitionEvent`, React events, or native view classes through public contracts.

Use this order in every mediator factory:

1. Acquire context utilities and read required parent context.
2. Initialize stable constants, generated IDs, relationship IDs, and registration
   keys.
3. Initialize the optional mutable `vars` object, listing mounted references
   before timers, counters, pending intent, and collections.
4. Create reactive, renderer-ready semantic state with every field initialized.
5. Perform initial registration or state synchronization.
6. Declare stable callback adapters used by context methods or effects.
7. Register effects.
8. Return the public mediator API.

Acquire required context directly:

```ts
const { getContext } = getContextUtils();
const context = getContext<ParentContext>(CONTEXT_KEY)!;
```

Do not add a one-use context wrapper that changes the missing-context behavior.
Use a one-time `Symbol('<componentName>')` for a child registration that must be
updated repeatedly; parent registration APIs must return the original index when
the same symbol is registered again.

Keep stable IDs, registration symbols, fixed callbacks, and immutable values out
of `vars`. Put mutable mounted references, timers, counters, pending interaction
intent, and collections in `vars`. Do not create an empty `vars` object.

The mediator may declare a `props` parameter only when it reads props or passes
them to helpers, callbacks, or effects. Renderers must omit that argument when a
mediator does not consume props.

## State, context, effects, and lifecycle

- Reactive state must contain normalized semantic values such as booleans or
  `undefined`, active/selected state, IDs, labels, indices, tab order, and
  transition state. Do not put DOM nodes, CSS property names, measured pixels, or
  native views in shared state.
- Normalize a disabled prop to `true | undefined`, never `false`, and have every
  renderer use that same value for the state class, native disabled property, and
  `aria-disabled`.
- Normalize optional ARIA-facing values in state. Keep related derived values in
  one effect so a label, role, relationship, busy state, and disabled state cannot
  become inconsistent between renderers.
- A component with an `ariaLabel` prop must provide a non-empty default in
  `DEFAULT_PROPS`, document it, and test both the default and explicitly empty
  states when omission is supported.
- If context publishes a value also present in state, expose the normalized value
  through a live context getter rather than recomputing raw props.
- Effects belong in the mediator when they coordinate state, registration,
  timers, mounted references, or interaction intent. DOM measurement and platform
  API calls belong in renderers.
- Use `useMounted` only for the smallest generic capabilities needed after mount,
  such as `{ focus: () => void }`. Use `useBeforeUnmount` for cleanup and ID
  release. Timers must use `ReturnType<typeof setTimeout>`, be cleared, and never
  depend solely on a browser transition event.
- Model interaction intent explicitly. Keyboard navigation may record a pending
  focus index which a child consumes; pointer or programmatic selection must not
  steal focus merely because active state changed.
- Keep returned mediator methods as thin adapters that pass the complete explicit
  resources (`props`, `state`, `context`, `vars`, constants, and arguments) to
  helpers.

## IDs and relationships

Use `idCache.getId('<componentName>')` with the public component name and a
lowercase first letter, for example `accordion`, `accordionPanel`, `button`,
`buttons`, or `carousel`. Resolve the host ID in the mediator:

- explicit non-empty `props.id` becomes `_${props.id}`;
- otherwise use the generated fallback;
- expose only the resolved value as `m.id`;
- assign `m.id` directly in every renderer and template.

Derive related IDs from the resolved value, such as `trigger${id}` and
`panel${id}`. Use those IDs for `for`, `aria-labelledby`, `aria-controls`, and
other relationships. Never recompute `p.id || m.id` in a renderer or use suffix
forms such as `${id}-trigger`. Release generated cache IDs in
`useBeforeUnmount`.

## Accessibility and usability

- Target WCAG 2.2 Level AA and the applicable WAI-ARIA Authoring Practices
  pattern; use GOV.UK guidance where it provides an equivalent public-service
  component pattern.
- Prefer native HTML controls and semantics. ARIA supplements native behavior and
  must not replace it. Do not specify clickable `div`, `span`, or `header`
  elements when a button or link is appropriate.
- Document the semantic structure, accessible name, role, state, relationships,
  keyboard keys, focus behavior, hidden-content behavior, content guidance, when
  to use, when not to use, and known limitations in each interactive README.
- Interactive controls must work with keyboard, expose a visible focus indicator,
  and keep visual state programmatically determinable.
- Collapsed or inactive content must not leave interactive descendants in the tab
  order or accessibility tree. Do not rely on clipping, opacity, transforms, or
  `aria-hidden` alone to disable focus.
- Model transition state explicitly when visual animation and semantic visibility
  differ. Never trap focus in content while it closes.
- Respect `prefers-reduced-motion` and `forced-colors`; ensure text, controls,
  indicators, and pointer targets meet applicable contrast and target-size rules.
- Exclude decorative icons from the accessibility tree and provide alternatives
  for meaningful non-text content.
- Slots must preserve the component's semantic shell. A slot replacing the
  control itself must expose all required semantic, event, focus, ID, and ARIA
  properties. Prefer component context for component-owned actions and live
  semantic state; reserve slot props for renderer-specific scoped values.
- Test mediator context commands and live getters through the mediator and at
  least one renderer integration. Document and test normalized state transitions,
  disabled/unavailable behavior, transition completion, cleanup, and controlled
  notifications.

## Cross-runtime compatibility

Components must support browser and Capacitor renderers and remain adaptable to a
dedicated NativeScript renderer. Import `isBrowser`, `isServer`, `isCapacitor`,
and `isNativeScript` from the `@pastweb/tools` root. Check the most specific
runtime first (`isNativeScript`, then `isCapacitor`, then browser/server), and do
not duplicate detection with direct global checks.

Do not statically import NativeScript, Capacitor, React DOM, or platform SDKs from
this package. If behavior genuinely differs by runtime, inject an adapter or
branch in the renderer and test every affected runtime by mocking the exported
environment module. Capacitor is web-like for DOM semantics, but do not assume a
desktop viewport, hover, or browser chrome.

Keep animation completion renderer-specific but call the same semantic mediator
method. Web renderers may use `transitionend`; NativeScript renderers may use a
native animation callback or promise. Map shared open, disabled, selected, busy,
labelled, and unavailable state to web ARIA/native properties or NativeScript
accessibility APIs without changing the mediator contract.

## Portable styling and CSS variables

Keep a shared component/part/state class and token contract, with separate
browser/Capacitor and NativeScript style entry points when their supported CSS
differs. Use component classes instead of HTML tag selectors for portable rules.
Reflect owned state on the root class (`is-disabled`, `is-loading`, `is-open`,
`is-selected`, `is-invalid`, and similar) while retaining required native
properties and attributes.

Browser styles may use web-only selectors such as `:hover`, `:focus-visible`,
`[aria-expanded]`, `forced-colors`, `prefers-reduced-motion`, viewport units, and
DOM layout properties. NativeScript styles must use its supported subset and
native state conventions. Keep logical direction, reduced motion, touch targets,
safe areas, long-content behavior, and iOS/Android differences in renderer style
entries rather than shared mediator state.

Component CSS variables use exactly:

```text
--pw_<ComponentName>_<part>_<state>_<css-property>
```

`pw` is lowercase; component names are PascalCase; use `root` and `default` when
there is no named part or state; part and state names are lowercase kebab case;
the final field is the real lowercase CSS property name. Use `em` rather than
`rem` for relative component token defaults. Valid examples include
`--pw_Accordion_root_default_background-color` and
`--pw_Accordion_header_hover_background-color`.

Use the controlled state vocabulary `default`, `hover`, `focus`, `focus-visible`,
`active`, `highlighted`, `disabled`, `open`, `closed`, `selected`, `invalid`, and
`loading` where applicable. Do not encode platforms in token names. Every
component README must include a CSS Variables table with the canonical variable,
part, state, CSS property, default, description, and supported platforms.

If a task only renames CSS variables, change only declarations and matching
`var(...)` references. Preserve selectors, values, order, layout, and behavior;
do not make unrelated visual or accessibility changes. CSS variable names are
public API, so document breaking renames.

## Templates and README documentation

XJS/XTS templates are framework-neutral. Do not use React or Vue slot/context
helpers (`useSlots`, `<Slots>`, `<Slot>`, or renderer-specific providers). Use the
lowercase intrinsic `<slot />` with `name`, `props`, fallback children, and `map`
when required, and provide component context with `setContext(contextKey, value)`.

Identify web-only properties such as `headingLevel`, landmarks, ARIA relations,
and DOM attributes as renderer properties rather than universal mediator state.
NativeScript documentation must describe native view types, tap/keyboard
activation, focus restoration, visibility, animation completion, and native
accessibility mapping without copying ARIA markup. A mediator importing
successfully is not enough to claim NativeScript compatibility: a native renderer,
styles, accessibility mapping, and device-level tests are required.

README files should use the public package style: short description, `## Features`,
installation when relevant, documentation overview, API syntax/parameters/returns,
examples, notes, and summary. Each interactive README must include the semantic
template, accessibility and keyboard behavior, slots, normalized state, CSS
variables, and platform limitations. Use root `@pastweb/tools` imports whenever
the symbol is root-exported.

## Tests and review

- Use Vitest, `vi` for mocks, and the `given..., when..., then...` test-title
  convention.
- Use `tests/<feature>/<feature>.<environment>.test.ts`, with `.node.test.ts`
  for Node-oriented tests and `.web.test.ts` for DOM/jsdom behavior.
- Cover defaults, mediator transitions, optional callbacks, context commands,
  generated IDs and cleanup, disabled/unavailable behavior, transitions, errors,
  controlled-state notifications, accessibility semantics, and renderer-specific
  acceptance criteria.
- Run focused tests first, then the package test command, typecheck, and build
  scripts. Do not hide failures with skipped tests or looser public types.
- Before handoff, verify root and local exports, renderer compatibility, README
  and style-token synchronization, public import examples, and release-safe
  documentation.

## Standards references

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK Design System components: https://design-system.service.gov.uk/components/
- Capacitor documentation: https://capacitorjs.com/docs
- NativeScript accessibility: https://docs.nativescript.org/guide/accessibility
- NativeScript styling: https://docs.nativescript.org/guide/styling
