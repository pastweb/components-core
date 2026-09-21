# Agent Instructions

This package is open source.

## Scope

`components-core` owns the public, framework-neutral component contracts,
mediator logic, shared style contracts, and XJS/XTS rendering templates
documented in each component README. Framework renderers such as
`react-components` implement those templates without redefining shared
behavior. Browser/Capacitor and NativeScript renderers may require separate SCSS
entrypoints when their supported properties, selectors, or native view types
differ.

The documented behavior and accessibility intent is canonical for every
implementation. The XJS/XTS template is the canonical web rendering contract;
native renderers implement the documented native mapping instead of copying
HTML or ARIA.

## General Rules

- Helper functions must include TSDoc with at least one `@example` block when they are exported or moved into shared utility files.
- If a helper function needs helper-specific constants or types, make that helper a directory with an `index.ts` barrel, a `constants.ts` file, and a `types.ts` file.
- Type exported object constants, including `DEFAULT_PROPS`, on the declaration itself. Put the type immediately after the constant name. Do not use a trailing `satisfies` clause.

  ```ts
  export const DEFAULT_PROPS: Partial<MyComponentDefaultProps> = {
    className: '',
  };
  ```
- If `utils.ts` grows over 200 lines, replace it with a `utils/` directory containing an `index.ts` barrel and one file per helper function, named after the exported helper.
- If a function file grows over 50 lines because it contains helper functions, move those helpers into a sibling `utils.ts` file and import them from there.
- README files must follow the `open-source/tools` README style: short package description, `## Features`, multi-manager `## Installation` when installable, `## Documentation Overview`, `## Summary`, then API sections with syntax, parameters, returns, examples, and notes where useful.
- In README documentation and TSDoc examples, when importing from `@pastweb/tools`, prefer the `@pastweb/tools` root import whenever the documented symbol is exported from the root package; use subpath imports only for symbols that are not root-exported or when documenting a subpath-specific entrypoint.
- Test titles must use the `given..., when..., then...` convention.
- Use `.node.test.ts` for Node tests and `.web.test.ts` for DOM/jsdom tests.
- Use Vitest for tests. Import test helpers from `vitest` and use `vi` for mocks.
- Put tests in `tests/<feature>/<feature>.<environment>.test.ts`, matching the convention used by `open-source/tools`.
- Do not import from `../../closed-source/`.
- Do not add framework-specific rendering behavior here.
- Keep contracts and mediator APIs usable by React, Vue, Capacitor, NativeScript, and other renderers.
- Keep documentation safe for public release.

## Accessibility and Usability Standard

- Treat WCAG 2.2 Level AA as the minimum accessibility target.
- Follow the relevant WAI-ARIA Authoring Practices Guide pattern when a component has an established pattern. Use the GOV.UK Design System as additional public-service usability guidance where an equivalent component exists.
- Prefer native HTML elements and behavior over custom roles. ARIA supplements native semantics; it does not replace them.
- The README template must define the intended semantic structure, accessible name, role, state, relationships, keyboard behavior, focus behavior, and hidden-content behavior.
- Use semantic headings, landmarks, lists, tables, form controls, and buttons according to their HTML purpose. Do not specify a clickable `div`, `span`, or `header` when a native `button` or link is appropriate.
- Every interactive component must be operable with a keyboard without timing-dependent input. Document standard keys and any optional navigation keys.
- Every interactive component must expose a visible focus indicator. Shared styles must not remove focus outlines unless they provide an equally visible replacement.
- State exposed visually must also be programmatically determinable through native state or appropriate ARIA attributes, including relationships such as `aria-controls`, `aria-labelledby`, and `aria-describedby`.
- IDs used for accessibility relationships must be unique and stable. Contracts must permit an explicit ID; component mediators own generated IDs and their related element IDs.
- Collapsed or inactive content must not leave hidden interactive descendants in the tab order or accessibility tree. Do not rely on clipping, height, opacity, transforms, or `aria-hidden` alone to disable focus.
- Model opening and closing transitions explicitly when visual animation and semantic visibility change at different times. Focus must never become trapped in content while it closes.
- Respect `prefers-reduced-motion` and `forced-colors` modes. Text, controls, state indicators, focus indicators, and pointer targets must meet applicable WCAG 2.2 AA contrast and target-size requirements.
- Decorative content and icons must be excluded from the accessibility tree. Meaningful non-text content must have an accessible alternative.
- Slot contracts must preserve the component's required semantic shell. Prefer slots that replace content inside a semantic control. A slot that replaces the control itself must expose and require all necessary semantic, event, focus, ID, and ARIA properties.
- Name behavior callbacks after intent, such as `onToggle`, rather than an input method such as `onToggleClick`, unless the behavior is genuinely pointer-specific.
- Clearly distinguish controlled state, uncontrolled initial state, and change callbacks. State changes must remain observable to consumers and assistive technology.
- Do not add optional landmark roles indiscriminately; avoid landmark proliferation for repeated components.
- Documentation must include when to use the component, when not to use it, content guidance, accessibility behavior, keyboard interaction, and known limitations. Do not claim WCAG conformance based only on automated tests.

## Component Implementation Rules

- Keep mediators framework- and DOM-independent. They may model semantic state and interaction intent but must not import React, Vue, browser renderers, or private packages.
- Keep component types, default props, mediator state, mediator methods, README property tables, slot tables, and XJS/XTS templates synchronized.
- When descendant components or replacement-slot content need component-owned
  actions or live semantic state, publish that API through the mediator's typed
  component context instead of passing mediator methods or state as slot props.
  Define context methods as a typed subset of the mediator API, initialize one
  stable `methods` object in the mediator, and compose it with live state getters
  through the component's `getContext` helper. Framework renderers must expose
  the context through their native context hook. Reserve slot props for values
  that are inherently renderer-specific or scoped to one slot invocation and
  cannot be obtained from the component context.
- Component mediators that expose IDs must obtain their fallback ID from
  `idCache.getId('<componentName>')`, using the public component name with a
  lowercase first letter as the prefix, such as `accordion`, `accordionPanel`,
  `button`, `buttons`, or `carousel`. Resolve the public host ID in the
  mediator and expose it as `m.id`: when `props.id` is non-empty, use
  `_${props.id}`; otherwise use the generated fallback. Do not expose the
  raw prop value. Renderers and XJS/XTS templates must assign the
  host element's `id` with `m.id` only; do not recompute `p.id || m.id` in
  the template. Related attributes and elements that must share that
  identity—such as `htmlFor`/`for` on a `<label>`, `aria-labelledby`,
  `aria-controls`, and prefixed part IDs—must use mediator-owned IDs derived
  from that same resolved value, for example `m.id`, `m.triggerId`, and
  `m.panelId`. Related element IDs must prefix the semantic part directly to
  the resolved ID without a separator, for example `trigger${id}` and
  `panel${id}`; never use suffix forms such as `${id}-trigger`. Every
  mediator that reserves an ID must release the generated cache ID in
  `useBeforeUnmount`.
- Put internal mediator helper functions in a sibling `utils.ts` rather than
  defining them inside the mediator factory. Pass the complete instance
  resources each helper needs, such as `props`, `state`, or `context`, as
  explicit parameters so dependencies remain readable and helpers do not create
  hidden dependencies. Keep thin returned API adapters, effects, stable callback
  wiring, and instance orchestration in the mediator factory; put the behavior
  executed by those adapters and lifecycle callbacks in helpers.
- Organize every mediator factory in this exact order:
  1. acquire context utilities and read required parent context;
  2. initialize stable constants, IDs, relationship IDs, and registration keys;
  3. initialize the optional mutable `vars` object;
  4. create reactive, renderer-ready state;
  5. perform any required initial registration or state synchronization;
  6. declare stable callback adapters required by context methods or effects;
  7. register effects;
  8. return the public mediator API.
- Declare a mediator `props` parameter only when the mediator reads props or
  passes them to helpers, callbacks, or effects. If props are entirely owned by
  the rendering template and unused by the mediator, omit the parameter
  completely; do not retain an unused `props` or `_props` placeholder merely
  because a renderer uses a mediator hook. Renderers must also omit the props
  argument when invoking a mediator that does not declare or consume props.
- Acquire required parent context directly in the mediator with
  `const { getContext } = getContextUtils()` followed by
  `const context = getContext<ParentContext>(CONTEXT_KEY)!`. Do not add a
  one-use helper that merely wraps `getContext`, casts its result, or throws a
  different missing-context error. Omit the non-null assertion only when the
  component contract explicitly permits use without its parent.
- Use a one-time `Symbol('<componentName>')` as the stable registration identity
  for a child mediator that must repeatedly update the same parent registration.
  Declare it as a stable constant in the mediator, not in `vars`, state, props,
  or the renderer. Do not use a fresh object literal or require React/Vue refs
  solely to preserve registration identity. Parent registration contracts must
  accept `symbol` keys and must return the original index when the same key is
  registered again.
- Keep stable values such as `uid`, explicit or generated IDs, derived
  relationship IDs, registration symbols, and fixed callbacks outside `vars`.
  Put only mutable per-instance resources in `vars`, such as mounted
  references, timers, intervals, counters, pending interaction intent, and
  mutable collections. List mounted reference properties first in both the vars
  type and initialization object, followed by timers or counters, pending
  intent, and collections. Do not create an empty `vars` object.
- Initialize one-time mediator constants and the `vars` object directly inside
  the mediator factory. Do not create a helper used only once to construct
  `vars`.
- Reactive state must contain normalized semantic values that renderers can
  consume directly, such as booleans or `undefined`, active state, relationship
  IDs, accessible labels, indices, and tab-order values. Keep simple class-name
  composition in the rendering template when classes are conditional only on
  local prop values or normalized state properties, for example a base class,
  `props.className`, and one or more local `is-*` state classes. When the
  complete class name must combine more complex shared inputs—especially
  inherited parent classes, positioning helpers, context values, or coordinated
  conditions—calculate it through a mediator `getClassName` helper and expose
  the final string as `state.className`. Keep that state synchronized with every
  prop, state, and live context dependency used by the helper; the renderer must
  then consume `state.className` without recomputing any part of it. Initialize
  every state field explicitly, then call a shared `updateState` helper once
  before registering effects when registration or context is required to
  calculate the real initial values.
- Keep fixed rendering properties out of mediator state when they are not
  calculated, normalized, or updated by props, context, interaction, or
  lifecycle. Static roles, element types, fixed tab indices, and other invariant
  renderer attributes belong directly in the canonical rendering template and
  each framework renderer. Add a value to mediator state only when the mediator
  owns a real state transition or derives the value from shared inputs.
- Effects belong in the mediator, not in framework renderers, when they
  coordinate shared state, registrations, timers, mounted references, or
  interaction intent. Keep DOM measurement and platform API access in the
  renderer. An effect callback should call a helper and its dependency function
  should read only the reactive props, state, or live context values that can
  change that result.
- Model the reason for an interaction explicitly when behavior depends on input
  intent. For example, keyboard navigation may record a pending focus index in
  the parent mediator; the target child consumes that request and focuses its
  mounted generic reference. Do not inspect `document.activeElement` in core,
  and do not pass an `isFocused` callback through `useMounted` when the mediator
  can own the keyboard-focus intent. Pointer and programmatic selection must not
  steal focus merely because active state changed.
- A mediator `useMounted` method must accept only the generic references needed
  after mounting. Store those references at the top of `vars` through a helper.
  Define the smallest platform-neutral capability interface, such as
  `{ focus: () => void }`; do not expose `HTMLElement`, React refs, NativeScript
  views, or document APIs. Additional renderer callbacks are allowed only when
  the result cannot be represented as mediator state or interaction intent.
- Move mediator actions, context construction, lifecycle cleanup, and other
  reusable behavior into helpers. Returned mediator methods should be thin
  adapters that pass `props`, `state`, `context`, `vars`, stable constants, and
  the event or method arguments only when required.
- Rely on the mediator's declared return type to contextually type callback
  parameters in the returned object. Do not repeat parameter types there; keep
  parameter contracts in the mediator interface and helper signatures.
- The standard `utils.ts` organization rules still apply to mediator helpers:
  exported helpers require TSDoc with an `@example`, helper-specific contracts
  belong in the component types, and a file over 200 lines must become a
  `utils/` directory with one helper per file and an `index.ts` barrel.
- In a mediator file, put value imports first and all `import type` statements last.
- Follow this mediator skeleton, omitting sections that are not needed:

  ```ts
  import { effect, getContextUtils, reactive } from '@pastweb/tools';
  import { CONTEXT_KEY } from '../Parent';
  import {
    applyPendingIntent,
    onActivate,
    updateState,
    useMounted,
  } from './utils';
  import type { ParentContext } from '../Parent';
  import type {
    ChildDefaultProps,
    ChildMediator,
    ChildMediatorVars,
    ChildState,
  } from './types';

  export function childMediator(
    props: ChildDefaultProps,
  ): ChildMediator {
    const { getContext } = getContextUtils();
    const context = getContext<ParentContext>(CONTEXT_KEY)!;
    const registrationKey = Symbol('child');

    const vars: ChildMediatorVars = {
      controlReference: null,
      pendingIntent: null,
    };

    const state = reactive<ChildState>({
      index: 0,
      isActive: false,
      isDisabled: undefined,
    });

    updateState(props, state, context, registrationKey);

    effect(
      () => updateState(props, state, context, registrationKey),
      () => [
        context.activeIndex,
        context.isDisabled,
        props.disabled,
      ],
    );

    effect(
      () => applyPendingIntent(state, vars, context),
      () => state.isActive,
    );

    return {
      state,
      onActivate: () => onActivate(props, state, context),
      useMounted: controlReference => (
        useMounted(vars, controlReference)
      ),
    };
  }
  ```
- Components that implement a `disabled` prop and expose it as mediator state must
  normalize `isDisabled` to `true | undefined`, never `false`. Renderers must use
  that same state value for the root `is-disabled` class, the native `disabled`
  property when supported, and `aria-disabled`, without renderer-side boolean
  conversion.
- When props determine optional accessibility semantics such as an accessible
  label, role, disabled state, busy state, or another ARIA-facing value,
  normalize those values in reactive mediator state instead of deriving them in
  each renderer. Use `undefined` for omitted values and narrow literal unions
  where possible, for example `ariaLabel: string | undefined`,
  `role: 'group' | undefined`, and `isDisabled: true | undefined`.
- Keep related derived accessibility state synchronized in the same effect when
  one prop controls multiple values. For example, an optional `ariaLabel` may
  update both `state.ariaLabel` and `state.role`; renderers must never observe a
  labelled value with a stale role.
- Every component whose public props include `ariaLabel` must define a non-empty,
  component-appropriate `ariaLabel` in its `DEFAULT_PROPS`, make the normalized
  default-props field required, and document the default. Preserve an explicit
  empty string when the contract allows consumers to omit the corresponding
  label and role, and test both the default-labelled and explicitly unlabelled
  renderings.
- When component context publishes a semantic value also present in mediator
  state, expose the normalized state value through a live context getter rather
  than independently recomputing it from raw props.
- Test context command methods through the mediator and through at least one
  framework integration using custom descendant or slot content. Tests must
  also verify that live context getters update after the corresponding mediator
  state changes.
- Document normalized mediator state in the component README and test both its
  initial value and reactive prop-driven updates, including the `undefined`
  state used to omit optional platform semantics.
- Make the least capable accessible behavior the default. Additional behavior such as single-selection, multiple-selection, collapsibility, persistence, or landmark regions must be explicit in the public contract.
- Shared SCSS must preserve semantic state in high contrast and `forced-colors` modes and must include reduced-motion treatment for non-essential animation.
- Tests must cover mediator state transitions, disabled or unavailable behavior, transition completion and cleanup, and controlled-state notifications where applicable.
- Accessibility acceptance criteria that depend on rendered HTML must be documented here and tested by each framework renderer.

## Cross-Runtime Compatibility

Components must support browser and Capacitor renderers and must keep their
contracts and mediators reusable by a dedicated NativeScript renderer. WAI-ARIA
and semantic HTML remain the web rendering contract; NativeScript renderers must
map the same intent to native views and native accessibility APIs.

### Environment detection

- Import runtime constants from the `@pastweb/tools` root: `isBrowser`, `isServer`, `isCapacitor`, and `isNativeScript`.
- Check the most specific runtime before a broader runtime. Capacitor is also browser-like, and NativeScript may expose server-like globals, so prefer `isNativeScript`, then `isCapacitor`, then `isBrowser` or `isServer` when branches overlap.
- Do not duplicate environment detection with direct checks for `window`, `document`, `Capacitor`, `__NS__`, `global.__nativeScript__`, user-agent strings, or platform globals when an `@pastweb/tools` constant already represents the runtime.
- Do not branch by environment unless behavior genuinely differs. Prefer dependency injection, renderer-owned adapters, and semantic mediator state over platform conditionals in shared logic.
- A core package must not statically import `@nativescript/core`, Capacitor plugins, React DOM, or platform SDKs. Platform packages own those dependencies and translate the shared contract.
- Any environment-specific branch must have a test for every affected runtime. Mock the exported environment module rather than mutating platform globals.

### Mediator portability

- Mediator state must describe user-visible or semantic intent, such as `isOpen`, `isContentAvailable`, or `transitionState`. Do not put renderer details such as DOM nodes, HTML attributes, CSS property names, `hideBorderBottom`, measured browser pixels, or native view instances in shared state.
- Use intent-based methods such as `onToggle`, `onOpen`, `onClose`, and `onTransitionEnd`. Do not encode DOM event names such as `onClick` unless the interaction is intentionally pointer-only.
- Name mediator lifecycle methods after the renderer hook that invokes them. Mount setup must be exposed as `useMounted`, and cleanup that executes immediately before destruction must be exposed as `useBeforeUnmount`; do not use the ambiguous `onMounted`, `onUnmount`, or `onBeforeUnmount` names for hook-bound methods.
- When shared behavior needs renderer references after mounting, expose a mediator `useMounted` method that accepts only the required references. Keep the behavior, effects, and reference coordination inside the mediator instead of requiring extra renderer callbacks. Use generic reference types and capability checks so the public contract does not expose DOM or native platform classes.
- Do not expose DOM `Event`, `HTMLElement`, `CSSStyleDeclaration`, `TransitionEvent`, React event, NativeScript `View`, Android, or iOS types through public core contracts. Use platform-neutral values or generic adapter callbacks.
- Do not access `window`, `document`, `navigator`, `matchMedia`, `localStorage`, DOM focus, layout measurement, or native platform APIs from a mediator. Put those operations in the renderer and pass results or callbacks into the core contract when needed.
- Timers must work in browser, Capacitor, NativeScript, and server tests. Type them with `ReturnType<typeof setTimeout>`, always clear them during cleanup, and never make correctness depend solely on a browser transition event.
- Animation state must permit renderer-specific completion. A web renderer may use `transitionend`; a NativeScript renderer may use a native animation promise or callback; both must be able to call the same semantic completion method.
- Keep accessibility intent platform-neutral in shared contracts. For example, expose open, disabled, selected, busy, labelled, or unavailable state; web renderers map it to native HTML/ARIA and NativeScript renderers map it to `accessibilityLabel`, `accessibilityRole`, `accessibilityState`, `accessibilityValue`, and hidden-element properties.
- Keep generated IDs mediator-owned so every renderer receives the same stable
  component and relationship IDs. Renderers map the mediator IDs to their DOM
  or native view properties and must call `useBeforeUnmount` so the mediator can
  release its generated cache ID.
- Treat Capacitor as a web renderer for DOM semantics, but do not assume desktop-only input, hover, a fixed viewport, or browser chrome dimensions.

### Portable styling

- Do not assume one generated stylesheet can be consumed unchanged by browsers and NativeScript. Keep a shared class/state/token contract and provide separate browser/Capacitor and NativeScript style entrypoints when necessary.
- Organize component SCSS around component, part, and state classes. The root component class and its descendant part classes are the canonical styling API; prefer class selectors over HTML element selectors, attribute selectors, or selectors coupled to a particular renderer's markup.
- Reflect public visual or interaction state on the root component with an `is-<state>` class whenever the component owns that state, for example `is-disabled`, `is-loading`, `is-open`, `is-selected`, or `is-invalid`. Framework renderers must derive these classes from normalized props or mediator state instead of requiring consumers to add them manually.
- Prefer styling a state through its root state class, for example `.Input.is-disabled .inputElement`, so the same state can be mapped consistently by web, Capacitor, and NativeScript renderers. Add state classes to individual parts only when different instances of that part can hold different states independently.
- Native semantic properties and attributes remain mandatory where the platform requires them. For example, a disabled web input must still receive the HTML `disabled` attribute even when the root also receives `is-disabled`; the class provides the styling contract, while the attribute provides native behavior and accessibility semantics.
- Attribute and pseudo-class selectors such as `:disabled`, `[disabled]`, `:checked`, `[aria-expanded="true"]`, and `[aria-invalid="true"]` may supplement class-based styles when they provide a useful native fallback or protect semantic state. Do not make them the only styling hook when the equivalent state is known to the component and can be represented by a class.
- When a state exists only on a native descendant and cannot be known reliably by the root renderer, styling that descendant through its native property or pseudo-class is allowed. Prefer propagating the state to a root or part class when doing so is reliable and does not duplicate an independent source of truth.
- Put only the intersection of supported class selectors, descendant selectors, custom properties, colours, typography, spacing, borders, alignment, and sizing into a portable style layer. Keep HTML element selectors and web-only pseudo-classes out of NativeScript-consumed files.
- Browser/Capacitor styles may use `:hover`, `:focus-visible`, `:disabled`, `inert`, `hidden`, `forced-colors`, `prefers-reduced-motion`, viewport units, and DOM layout properties. NativeScript styles must use its supported CSS subset and native state conventions such as `:highlighted`, `.ns-ios`, `.ns-android`, `.ns-phone`, `.ns-tablet`, `.ns-portrait`, and `.ns-landscape`.
- When a component needs both targets, use clearly named entries such as `Component.scss` for browser/Capacitor and `Component.nativescript.scss` for NativeScript. Extract common tokens or supported rules into a partial imported by both; never import the browser entrypoint as the NativeScript stylesheet.
- Use component classes rather than HTML tag selectors for any rules intended to be portable, because NativeScript view names do not match HTML element names.
- Use logical direction and shared `rtl` state where possible. NativeScript renderers must additionally map direction to native layout behavior and ensure Android RTL support is enabled by the application.
- Interactive targets must remain at least 44 CSS pixels in browser/Capacitor and 44 device-independent pixels in NativeScript. Do not make the minimum depend only on inherited font size.
- Do not make an interaction discoverable only through hover. Provide pressed/highlighted, focus, disabled, expanded, selected, and error states suitable for touch, keyboard, switch access, VoiceOver, and TalkBack.
- Avoid fixed viewport-height caps such as `max-height: 100vh` for expanding content. Mobile viewport changes, orientation, safe areas, and on-screen keyboards must not clip or make content unreachable.
- Animation must not determine semantic availability. Browser/Capacitor styles must honor `prefers-reduced-motion`; NativeScript renderers must query and honor the native reduced-motion setting because NativeScript media-query support is not equivalent to a browser.
- Use platform-specific style files or root classes for iOS and Android differences rather than branching shared mediator state for visual concerns.
- Unsupported NativeScript CSS properties must not be required for layout, state communication, focus, or accessibility. Native renderers must provide an explicit fallback or platform implementation.

### CSS variable naming

- Component CSS variables must use the fixed grammar `--pw_<ComponentName>_<part>_<state>_<css-property>`.
- When a task is limited to applying the CSS variable naming convention,
  change only custom-property declarations and matching `var(...)` references.
  Preserve every selector, CSS property, value, declaration order, layout,
  visual state, interaction rule, and accessibility behavior exactly as it
  was.
- Do not combine, split, add, remove, or otherwise improve CSS declarations
  while renaming variables. If an accessibility, usability, responsive, or
  visual improvement is identified during a naming-only task, describe it
  separately and obtain explicit user confirmation before changing it.
- `pw` is the lowercase Pastweb namespace. `<ComponentName>` must match the public component name in PascalCase, for example `Accordion`, `AccordionPanel`, or `RangeSlider`.
- Every variable must contain exactly five underscore-separated fields after the leading `--`. Underscores are reserved as field separators and must not appear inside a field.
- Use `root` when a token applies to the component rather than a named part, and use `default` when no interactive or semantic state applies. Do not omit either field.
- Part and state names must use lowercase kebab case, for example `close-button`, `close-bar`, `focus-visible`, or `read-only`.
- The final field must use the real CSS property name in lowercase kebab case, such as `background-color`, `border-radius`, `transition-duration`, or `padding`. Use `color`, not invented aliases such as `text-color`, when the token controls the CSS `color` property.
- Use `em` rather than `rem` for relative length values in component CSS variable defaults.
- Examples of valid names are `--pw_Accordion_root_default_background-color`, `--pw_Accordion_header_hover_background-color`, and `--pw_Accordion_close-button_default_border-radius`.
- Treat component, part, state, and property as structured token metadata. Do not call the middle segment a comment.
- Use a controlled state vocabulary where possible: `default`, `hover`, `focus`, `focus-visible`, `active`, `highlighted`, `disabled`, `open`, `closed`, `selected`, `invalid`, and `loading`.
- Do not encode platform names into the variable identifier. Record platform support in documentation and, when available, the token manifest.
- Every component README must include a `CSS Variables` table listing the canonical variable, part, state, CSS property, default value, description, and supported platforms.
- The future component editor must read structured token metadata rather than inferring all behavior from variable names. Keep the CSS variable name, README table, and token manifest synchronized once the manifest exists.
- CSS variable names are public API. Use canonical component token names directly and do not retain legacy variable names as compatibility fallbacks when renaming them. Document breaking token renames in the relevant release notes or migration guidance.

### Rendering and documentation

- Each interactive component README must document two contracts when NativeScript support is intended: the semantic web XJS/XTS template and a platform-neutral behavior/accessibility mapping for native renderers.
- Keep XJS/XTS templates framework-neutral. Do not import or use renderer-specific slot helpers such as `useSlots`, `<Slots>`, or `<Slot>`.
- Represent slot projection with the lowercase XJS/XTS intrinsic `<slot />`. Use `name`, `props`, fallback children, and `map` directly on `<slot>` when the contract requires them; projected values inside a `map` may be rendered directly in the mapped template.
- Provide component context with the framework-neutral `setContext(contextKey, value)` XJS/XTS helper before returning the template. Do not use renderer-specific context providers such as React's `<GlobalContext>` component in XJS/XTS examples.
- Web-only properties such as `headingLevel`, landmark roles, ARIA relationships, and DOM attributes must be identified as renderer properties rather than universal mediator behavior.
- NativeScript documentation must identify the required native view types, tap/keyboard activation, focus restoration, visibility behavior, animation completion, and accessibility mapping. Do not copy ARIA attributes into native markup.
- Capacitor acceptance tests must run the web renderer on iOS and Android WebViews with touch, VoiceOver/TalkBack, orientation changes, dynamic text, reduced motion, and long content.
- NativeScript acceptance tests must run native views on iOS and Android with VoiceOver/TalkBack, native focus, dynamic text, reduced motion, orientation changes, and platform animation completion.
- A component is not considered NativeScript-compatible merely because its mediator imports successfully. Compatibility requires a native renderer, native accessibility mapping, supported styles, and device-level tests.

## Standards References

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK Design System components: https://design-system.service.gov.uk/components/
- Capacitor documentation: https://capacitorjs.com/docs
- NativeScript accessibility: https://docs.nativescript.org/guide/accessibility
- NativeScript styling: https://docs.nativescript.org/guide/styling
