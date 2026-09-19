# Cross-Platform Component Roadmap

## Purpose

`components-core` is the platform-neutral source of component contracts,
semantic state, interaction intent, mediator logic, shared tokens, and web XTS
templates. It must be safe to import and execute without a DOM.

The current delivery target is Browser, Capacitor, and Electron. These
platforms all execute the web renderer and therefore share one DOM, CSS,
keyboard, Pointer Events, and accessibility implementation.

The target platforms have different integration boundaries:

- Browsers render HTML and CSS through a web framework package.
- Capacitor renders the same web implementation in a WebView. Native services
  are supplied by a Capacitor package or plugin adapter.
- Electron renders the same web implementation in its renderer process. Native
  windows, notifications, and operating-system services are supplied through a
  typed, secure preload/IPC adapter.
- NativeScript is deferred. Core contracts should avoid unnecessary barriers to
  a future native renderer, but NativeScript implementation and device support
  are not release gates in this roadmap.

This package will not import Electron, Capacitor, NativeScript, DOM renderer, or
platform plugin modules. Platform packages extend core behavior through typed
capability interfaces and renderer-owned adapters.

## Compatibility Definition

A core component is portable only when all of the following are true:

1. Its public types do not expose DOM, browser event, React, Electron,
   Capacitor, NativeScript, Android, or iOS classes.
2. Importing and exercising its mediator in Node does not require `window`,
   `document`, layout APIs, or platform globals.
3. Its state describes semantic intent rather than pixels, DOM nodes, CSS
   properties, or native view instances.
4. Measurement, focus movement, pointer capture, rendering, navigation, asset
   loading, and platform services are behind renderer or capability contracts.
5. Timed behavior can respond to application lifecycle changes and can be
   tested with a deterministic scheduler.
6. Browser, Capacitor, and Electron integrations can add capabilities without
   forking the component state model.

NativeScript compatibility is not claimed by this roadmap. Avoiding DOM types
in mediator contracts preserves a future extension boundary, but does not
replace a dedicated native renderer and device tests.

## Target Architecture

```txt
components-core
  semantic contracts + mediators + capability interfaces
              |
              +-- web renderer (Browser, Capacitor WebView, Electron renderer)
              |     DOM, CSS, ARIA, focus, measurement, pointer input
              |
              +-- Capacitor integration package
              |     app lifecycle, native notifications, haptics, plugins
              |
              +-- Electron integration package
              |     typed preload bridge, native windows, native notifications
              |
              +.. future NativeScript renderer/integration package
                   (deferred and not a current release gate)
```

Platform services must be optional capabilities. A component must preserve its
ordinary in-app behavior when a capability is unavailable or denied.

## Priority and Status

- **P0 - blocker:** core currently has a direct DOM/runtime dependency.
- **P1 - high:** the core contract is browser-shaped or lacks a required
  lifecycle/service boundary.
- **P2 - medium:** the core is usable but touch, lifecycle, or renderer behavior
  remains incomplete across the current browser-like targets.
- **P3 - low:** conformance, performance, or platform polish.

The findings below describe the current source audit. Checkboxes represent
planned work, not completed support. NativeScript notes are future design
constraints and do not block the Browser, Capacitor, or Electron release.

## Audit Summary

| Component | Priority | Main portability risk |
| --- | --- | --- |
| Accordion | P1 | Timer-based animation completion and generated-ID ownership |
| Button | P2 | Press events and native busy/disabled mapping |
| Buttons | P2 | Group semantics and native focus/navigation mapping |
| Carousel | P1 | Global autoplay timer, hover assumptions, lifecycle, and gestures |
| Checkbox | P1 | Floating UI type leakage and DOM-shaped change input |
| DropDown | P0 | DOM elements, layout APIs, global listeners, and Floating UI in core |
| Icon | P1 | Global `fetch`, remote asset policy, and SVG/native asset differences |
| Input | P1 | Floating UI type leakage, IME, keyboard, and native input mapping |
| Link | P1 | Browser navigation model and unsafe native/external URL ambiguity |
| Notification | P1 | Inline notification can be confused with an OS notification service |
| Pagination | P2 | Native collection/navigation and announcement mapping |
| Panel | P3 | Native container, heading, and collapsible semantics |
| ProgressBar | P2 | Native progress semantics and indeterminate animation |
| Radio | P1 | Floating UI type leakage, `any` event/value contracts, group mapping |
| RangeSlider | P1 | Browser-event leakage and pointer/keyboard/native gesture differences |
| ScrollArea | P1 | Renderer measurement, momentum scrolling, safe areas, and scroll intent |
| Select | P1 | Floating UI type leakage, untyped values, popup/focus behavior |
| SheetController | P1 | DOM-shaped host, timers, system back, keyboard, and safe areas |
| Spinner | P2 | Native animation and reduced-motion mapping |
| SplitLayout | P1 | Responsive bounds, RTL, multi-touch, and native layout measurement |
| Stepper | P2 | Framework-shaped content and native navigation/accessibility mapping |
| Table | P0 | HTML table types, DOM traversal, computed styles, and global input listeners |
| Tabs | P1 | Dynamic registration, stale entries, focus order, and native pager mapping |
| Tag | P2 | Action/removal semantics and native target sizing |
| TextArea | P1 | IME, native keyboard, selection, resizing, and growing-height behavior |
| ToastController | P1 | Timers, DOM-shaped host, app lifecycle, and OS notification boundary |
| Toggle | P1 | Event protocol and native switch state/announcement mapping |
| Tooltip | P1 | Timers, hover model, placement, touch, and native hint behavior |
| WindowController | P1 | In-document model lacks an optional native window-manager boundary |

## Phase 0: Portability Guardrails

Complete these before adding more platform-specific behavior.

- [ ] Add a Node import test for every public entrypoint. The test must fail if
  importing an entrypoint reads a DOM or platform global.
- [ ] Add a core-only TypeScript check without the DOM library. Keep a separate
  web-renderer configuration for HTML and browser event types.
- [ ] Add a dependency rule that rejects imports from `@floating-ui/dom`,
  `interactjs`, renderer packages, Electron, Capacitor plugins, and
  `@nativescript/core` inside core source.
- [ ] Replace the Floating UI `Placement` types used by Checkbox, DropDown,
  Input, Radio, and Select with a core-owned semantic placement type. A web
  adapter may translate it to Floating UI.
- [ ] Remove `@floating-ui/dom` and `interactjs` from core peer dependencies
  after DropDown and Table no longer use them. Renderer packages may depend on
  them directly.
- [ ] Replace process-global generated IDs in mediator state with explicit IDs
  or an injected `IdProvider`. Renderers remain responsible for SSR,
  hydration, multi-root, and native-view-safe IDs.
- [ ] Replace renderer event objects and `any` callbacks with semantic values,
  small platform-neutral input records, or generic value parameters.
- [ ] Add contract tests using a fake renderer and fake platform capabilities.

### Shared runtime services

Define small, optional contracts in a dedicated core entrypoint. Avoid a single
large platform object that every component must understand.

- [ ] `Scheduler`: timeout, interval, cancellation, and monotonic time. Supply a
  default JavaScript implementation and deterministic test implementation.
- [ ] `AppLifecycle`: active, inactive, background, and resume subscriptions.
- [ ] `IdProvider`: stable scoped identifiers when the renderer does not supply
  an explicit ID.
- [ ] `HostChannel<TEvent>`: typed subscribe/unsubscribe communication for
  portals and controllers; it must not imitate DOM `EventTarget`.
- [ ] `FocusHandle`: a minimal semantic focus capability owned by a renderer.
- [ ] `NavigationAdapter`: internal navigation and explicitly approved external
  URL opening.
- [ ] `PopupAdapter`: measurement, collision handling, safe-area constraints,
  outside interaction, and focus restoration.
- [ ] `WindowManagerAdapter`: optional native/windowed surface lifecycle.
- [ ] `NotificationAdapter`: optional operating-system notification lifecycle.
- [ ] `IconLoader`: cancellable icon lookup with error and cache policy.

Adapters that perform I/O should return promises and typed results. They must
support capability detection, cancellation where meaningful, and explicit
errors for unavailable, denied, or failed operations.

## Phase 1: Remove Current Portability Blockers

### DropDown - P0

**Weak points**

- The mediator imports and executes `@floating-ui/dom`.
- Public APIs accept `HTMLElement` references.
- Positioning reads bounding rectangles, computed styles, and window scroll.
- Outside-click handling installs global window listeners.
- Arrow dimensions and resulting pixel styles are renderer details.

**Roadmap**

- [ ] Keep only open/close/toggle state, trigger intent, selection policy, and
  semantic placement preference in the mediator.
- [ ] Move Floating UI, layout reads, arrow placement, outside interaction,
  portals, focus restoration, and listener cleanup to the web renderer.
- [ ] Introduce a `PopupAdapter` input/output contract for renderers that need
  shared popup orchestration without exposing view instances.
- [ ] Let a NativeScript renderer map the contract to a modal, popover, or
  positioned native view according to platform capability.
- [ ] Cover resize, scroll, orientation, virtual keyboard, safe-area, RTL,
  touch, and dismissal behavior in renderer tests.

**Exit criteria:** DropDown imports and mediator tests run with no DOM library;
all placement dependencies are renderer-owned.

### Table - P0

**Weak points**

- The mediator and public contract expose `HTMLTableElement`.
- Column resizing traverses DOM parents and reads computed widths.
- Resize, pin, reorder, drag, mouse, and touch logic installs window listeners
  and consumes browser event classes.
- Renderable cells and many update callbacks use `any`, which makes a native
  renderer and bridge-safe state model difficult to define.

**Roadmap**

- [ ] Split the data model from web table interaction code.
- [ ] Make sorting, filtering, grouping, expansion, selection, visibility,
  ordering, pinning, and sizing pure operations over stable row/column IDs.
- [ ] Replace `onResize(event)` with semantic operations such as
  `beginResize(columnId)`, `resizeBy(delta)`, and `endResize()`.
- [ ] Move DOM measurement, pointer capture, drag/drop, keyboard grid behavior,
  and listener ownership to the web renderer.
- [ ] Replace framework-renderable `Component` values with typed renderer slots
  or opaque renderer-owned content.
- [ ] Add optional virtualization/windowing contracts that consume visible
  ranges rather than DOM nodes.
- [ ] Define a NativeScript mapping for collection/grid views, including
  recycling, selection, sorting, accessibility, and large datasets.

**Exit criteria:** table state operations pass Node tests, no core type names a
DOM class, and web/native renderers can provide independent measurement and
interaction adapters.

## Phase 2: Lifecycle, Events, Assets, and Popup Boundaries

### Accordion - P1

- [ ] Run transition fallback timing through `Scheduler` and cancel it on
  unmount or a newer transition.
- [ ] Keep panel IDs renderer-provided or `IdProvider`-provided; test SSR,
  multiple roots, dynamic insertion, and removal.
- [ ] Let renderers report animation completion through the same semantic
  method; do not make content availability depend on CSS events.
- [ ] Map expanded state, focus order, heading intent, and hidden descendants to
  native accessibility APIs in the NativeScript renderer.

### Button - P2

- [ ] Normalize activation to a semantic press action rather than forwarding a
  framework event through the mediator.
- [ ] Define consistent disabled, loading, repeated-press, and async-action
  behavior.
- [ ] Map to native Button accessibility and at least a 44 DIP target without
  making hover or keyboard events universal requirements.

### Buttons - P2

- [ ] State whether the group is visual, a toolbar, or a selection group; do
  not infer semantics from layout.
- [ ] Keep orientation and selection intent platform-neutral.
- [ ] Put roving focus and arrow-key behavior in renderer adapters where the
  target platform supports them.

### Carousel - P1

- [ ] Replace the global interval with `Scheduler` and pause autoplay when the
  application is inactive or backgrounded.
- [ ] Replace mouse-named mediator methods with hover-capability or semantic
  pause inputs; hover must remain optional.
- [ ] Define renderer gestures for swipe, drag, keyboard, switch access, and
  native paging without putting gesture objects in core.
- [ ] Register and unregister stable item IDs so dynamic children do not leave
  stale counts or indices.
- [ ] Add reduced-motion, visibility, focus, and interrupted-animation tests.

### Checkbox - P1

- [ ] Replace the Floating UI placement type with a core-owned label placement.
- [ ] Accept the next checked/indeterminate value rather than a DOM-shaped
  `currentTarget` object.
- [ ] Define native checked, mixed, disabled, validation, and group mappings.

### Icon - P1

- [ ] Move global `fetch` behind `IconLoader`; core must not initiate network
  requests merely because an icon name was rendered.
- [ ] Add cancellation, deduplication, cache, retry, and observable error rules.
- [ ] Treat raw SVG, remote URLs, bundled web assets, Android resources, and iOS
  assets as renderer-specific sources with an explicit safe-source policy.
- [ ] Do not log from the mediator; return or publish a typed loading error.

### Input - P1

- [ ] Replace the Floating UI placement type with a core-owned label placement.
- [ ] Model value, validation, busy, read-only, and disabled state without DOM
  event objects.
- [ ] Keep IME/composition, selection, autofill, input mode, secure entry,
  keyboard type, and native keyboard dismissal in renderer contracts.
- [ ] Test software keyboard resizing and safe-area behavior in Capacitor and
  NativeScript renderers.

### Link - P1

- [ ] Separate navigation intent from browser `href` execution.
- [ ] Use `NavigationAdapter` for application routes and external URLs while
  preserving ordinary anchors in the web renderer.
- [ ] Require explicit external-navigation policy. Electron implementations
  must use a validated preload bridge rather than exposing Node APIs; native
  implementations must use approved platform URL handlers.
- [ ] Define unavailable, blocked, and failed navigation results.

### Notification - P1

The current Notification component is an **in-app inline message**, not an
operating-system notification.

- [ ] Preserve that distinction in names, documentation, and public types.
- [ ] Extract a reusable `NotificationIntent` only if inline and OS
  notifications genuinely share fields such as title, body, severity, and
  actions; do not couple their lifecycles.
- [ ] Let platform packages map OS notification permissions, delivery,
  scheduling, actions, deep links, badges, and background behavior through
  `NotificationAdapter`.
- [ ] Keep inline dismiss, live-region, and visual behavior independent of
  whether OS notifications are supported or permitted.

### Pagination - P2

- [ ] Keep page/range calculation pure and expose semantic page-change intent.
- [ ] Define renderer policy for compact mobile layouts, large datasets, focus,
  and result-count announcements.
- [ ] Let native renderers choose buttons, a pager, or collection controls
  without changing the page model.

### Panel - P3

- [ ] Keep visual border and radius props separate from semantic container or
  heading behavior.
- [ ] Document native container, heading, and optional collapsible mappings.
- [ ] Add conformance tests for dynamic content and text scaling.

### ProgressBar - P2

- [ ] Normalize min, max, value, and indeterminate state in core.
- [ ] Let renderers map web progress semantics and native progress views.
- [ ] Ensure indeterminate animation is optional and respects reduced motion.

### Radio - P1

- [ ] Replace the Floating UI placement type with a core-owned label placement.
- [ ] Make value generic and pass semantic value changes instead of `any`
  framework events.
- [ ] Define stable group membership, unregister behavior, required state,
  disabled-item navigation, and native RadioButton/segmented-control mapping.

### RangeSlider - P1

- [ ] Replace event-bearing callbacks with numeric value and commit intents.
- [ ] Keep pointer, touch, keyboard, wheel, and native pan gestures in renderers.
- [ ] Normalize clamping, step rounding, min/max changes, RTL, and orientation
  in pure core logic.
- [ ] Define native accessibility increment/decrement actions and value text.

### ScrollArea - P1

- [ ] Represent scroll requests as semantic alignment, item, or offset intents;
  do not store scroll elements or native view instances.
- [ ] Put measurement, scrollbars, momentum, overscroll, pointer behavior, and
  programmatic scrolling in renderers.
- [ ] Account for safe areas, software keyboards, nested scrolling, RTL, text
  scaling, and restoration.
- [ ] Map to NativeScript ScrollView/ListView capabilities and document cases
  that require a virtualized collection instead.

### Select - P1

- [ ] Replace the Floating UI placement type with a core-owned label placement.
- [ ] Make item values generic and serializable where a platform bridge is
  used; remove `any` from change and key contracts.
- [ ] Use stable item IDs with register, unregister, reorder, disabled, and
  highlighted-state handling.
- [ ] Move popup placement, outside interaction, focus traversal, virtual
  keyboard avoidance, and portal behavior to `PopupAdapter`/renderers.
- [ ] Allow a NativeScript renderer to choose a picker, action sheet, or custom
  accessible list while preserving selection semantics.

### SheetController - P1

- [ ] Replace DOM-shaped event targets with `HostChannel<SheetHostEvent>`.
- [ ] Replace close timers with `Scheduler`; support interrupted and immediate
  animations.
- [ ] Add semantic system-back and dismiss-gesture inputs for Android,
  Capacitor, and NativeScript adapters.
- [ ] Keep focus trapping/restoration, safe areas, software keyboard avoidance,
  swipe-to-dismiss, and native modal presentation renderer-owned.

### Spinner - P2

- [ ] Define whether the spinner is decorative or represents busy state; keep
  its accessible status separate from animation.
- [ ] Map to native activity indicators and honor platform reduced-motion
  settings.
- [ ] Ensure parent loading state remains observable when animation is removed.

### SplitLayout - P1

- [ ] Keep pane sizes and constraints in normalized, platform-neutral units;
  renderers convert physical measurements to ratios.
- [ ] Define behavior when minimum sizes cannot fit in the available container.
- [ ] Move pointer capture, multi-touch arbitration, container observation, and
  drag affordances to renderers.
- [ ] Correctly map logical direction, RTL arrow behavior, orientation changes,
  safe areas, and a 44 CSS-pixel/DIP separator target.
- [ ] Support stable pane IDs and optional persistence through an injected
  storage adapter, never direct local storage.
- [ ] Map NativeScript rendering to GridLayout or an equivalent native layout.

### Stepper - P2

- [ ] Replace `content: any` with renderer slots or an opaque generic content
  type that core never inspects.
- [ ] Define stable step IDs, dynamic unregister/reorder behavior, completion,
  validation, optional steps, and navigation intent.
- [ ] Map orientation, current-step announcements, focus, and native navigation
  without assuming HTML content.

### Tabs - P1

- [ ] Add stable registration tokens plus unregister/reorder operations for
  dynamic tabs and panels.
- [ ] Define controlled/uncontrolled selection and fallback when the active tab
  becomes disabled or is removed.
- [ ] Keep focus movement intent separate from DOM focus calls.
- [ ] Map to NativeScript tabs or a pager while preserving lazy/hidden content,
  state retention, and accessibility relationships.

### Tag - P2

- [ ] Distinguish static status tags from interactive/selectable/removable
  tags in the public contract.
- [ ] Expose remove/select intent without renderer events.
- [ ] Map disabled state, focus, accessible removal labels, and 44 DIP action
  targets in native renderers.

### TextArea - P1

- [ ] Keep value, validation, read-only, disabled, and length state semantic.
- [ ] Put IME/composition, selection, clipboard, resize handles, native growing
  height, and keyboard behavior in renderers.
- [ ] Define max-length announcement and error behavior across web and native
  accessibility APIs.
- [ ] Test long text, dynamic type, orientation, and software keyboard overlap.

### ToastController - P1

ToastController owns **in-app transient messages**. It must not directly invoke
operating-system notification APIs.

- [ ] Replace timers with `Scheduler` and pause/resume them through
  `AppLifecycle` when the application backgrounds.
- [ ] Define whether elapsed background time closes, pauses, or immediately
  expires a toast on resume; make the policy explicit.
- [ ] Replace DOM-shaped hosts with a typed `HostChannel<ToastHostEvent>`.
- [ ] Keep stacking measurement and viewport/safe-area placement in renderers.
- [ ] Optionally translate an application notification intent to either an
  in-app toast or `NotificationAdapter`, but never silently send both.
- [ ] Test multiple windows, multiple roots, suspended WebViews, interrupted
  animations, and cleanup.

### Toggle - P1

- [ ] Pass the next boolean value and semantic change metadata rather than a
  renderer event.
- [ ] Define controlled state, read-only versus disabled behavior, and failed
  async changes.
- [ ] Map to native switch views and native checked-state announcements.

### Tooltip - P1

- [ ] Replace show/hide timers with `Scheduler`.
- [ ] Keep placement, measurement, collision handling, portals, and viewport
  tracking in `PopupAdapter`/renderers.
- [ ] Treat hover as one optional trigger. Define focus, long-press, tap,
  dismissal, and coarse-pointer policies without making tooltip-only content
  necessary to complete a task.
- [ ] Let NativeScript renderers map simple help text to an accessibility hint
  or an explicit native popover where supported.

### WindowController - P1

WindowController currently models an in-document modal or floating surface. A
native operating-system window is an optional extension, not a replacement for
that behavior.

- [ ] Replace DOM-shaped hosts with `HostChannel<WindowHostEvent>` and close
  timers with `Scheduler`.
- [ ] Introduce an optional `WindowManagerAdapter` with capability discovery and
  asynchronous `create`, `focus`, `move`, `resize`, `minimize`, `maximize`,
  `restore`, and `close` operations.
- [ ] Distinguish `surface` and `native-window` modes explicitly. If native
  windows are unavailable or permission is denied, use a documented fallback.
- [ ] Represent bounds independently of CSS pixels and include display identity,
  scale, safe/work area, minimum size, and multi-monitor changes.
- [ ] Keep in-document pointer movement, resize handles, focus trapping, and
  z-order in the web renderer.
- [ ] Implement Electron operations only behind a validated, typed preload/IPC
  bridge with context isolation. Core and renderer code must never import
  Electron main-process APIs.
- [ ] Let a browser adapter use supported windowing capabilities only after
  feature/permission checks and retain an in-document fallback.
- [ ] Let NativeScript map the contract to an appropriate modal/floating view
  when OS-level application windows are not available.

## Phase 3: Platform Packages

### Browser/Web renderer

- [ ] Own DOM, CSS, semantic HTML, ARIA, focus, pointer/keyboard input,
  measurement, observers, portals, and popup positioning.
- [ ] Provide browser implementations of scheduler, lifecycle, navigation,
  popup, and optional notification/window capabilities.
- [ ] Feature-detect optional APIs and preserve accessible in-document
  fallbacks.

### Capacitor integration

- [ ] Reuse the web renderer for all component UI.
- [ ] Bridge Capacitor app lifecycle to `AppLifecycle` so timers, autoplay, and
  transient UI behave consistently during suspend/resume.
- [ ] Implement `NotificationAdapter` through a maintained Capacitor plugin,
  including permission, scheduling, action, deep-link, and error results.
- [ ] Test iOS and Android WebViews for safe areas, software keyboards,
  orientation, back handling, touch, reduced motion, and screen readers.

### Electron integration

- [ ] Reuse the web renderer in the renderer process.
- [ ] Implement `WindowManagerAdapter` and `NotificationAdapter` in the main
  process behind a minimal typed preload bridge.
- [ ] Validate messages and URLs on both sides of IPC; never expose unrestricted
  filesystem, shell, or Node access to component code.
- [ ] Test multiple displays, scale-factor changes, window recreation, renderer
  crashes, denied capabilities, and application shutdown cleanup.

### NativeScript renderer and integration

- [ ] Implement native views from semantic contracts rather than parsing the
  XTS HTML template.
- [ ] Supply native focus, popup, navigation, lifecycle, notification, gesture,
  animation, measurement, icon, and accessibility adapters.
- [ ] Provide NativeScript-specific style entrypoints where browser SCSS is not
  supported.
- [ ] Test iOS and Android with VoiceOver/TalkBack, switch/keyboard access,
  dynamic type, reduced motion, orientation, safe areas, and native animation
  completion.

## Phase 4: Verification and Release Gates

No component should be advertised for a platform until its relevant gates pass.

- [ ] **Core gate:** build and all mediator tests pass in Node with no DOM
  library or mocked browser globals.
- [ ] **Dependency gate:** core production and peer dependencies contain no DOM
  positioning, gesture, Electron, Capacitor plugin, or NativeScript runtime
  package.
- [ ] **Web gate:** browser tests cover keyboard, focus, pointer, touch,
  responsive layout, reduced motion, forced colors, and WCAG 2.2 AA intent.
- [ ] **Capacitor gate:** device tests pass on supported iOS and Android WebViews,
  including suspend/resume and native capability denial.
- [ ] **Electron gate:** renderer tests and main/preload integration tests pass
  with context isolation and validated IPC.
- [ ] **NativeScript gate:** native renderer, styles, accessibility mapping, and
  device tests pass on supported iOS and Android versions.
- [ ] **Failure gate:** missing, denied, cancelled, timed-out, or failed platform
  capabilities produce typed results and leave mediator state consistent.
- [ ] **Documentation gate:** each component README states supported renderers,
  native mapping, optional capability requirements, fallbacks, and known
  limitations.

## Recommended Delivery Order

1. Add the Phase 0 checks and shared minimal runtime contracts.
2. Refactor DropDown and Table until the core passes a DOM-free typecheck.
3. Replace external placement types, `any` event contracts, global ID ownership,
   global fetch, and controller host event targets.
4. Migrate timers and add application lifecycle behavior.
5. Stabilize popup, navigation, notification, and window-manager capability
   interfaces with fake adapters and contract tests.
6. Complete the browser renderer adapters, then Capacitor and Electron
   integrations.
7. Build the NativeScript renderer component by component, starting with simple
   controls before popup, table, split layout, sheet, toast, and window surfaces.

This order makes the core boundary enforceable before platform packages depend
on it, while preserving browser behavior through renderer-owned adapters.
