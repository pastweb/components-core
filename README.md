# Components Core

Components Core is the framework-neutral source of Pastweb component contracts.
Each component owns its public types, default values, mediator logic, shared
SCSS contract, and an XJS/XTS rendering template. Framework packages such as
`react-components` translate that template into executable components
without redefining the shared behavior.

## Summary

- [XJS/XTS Language](#xjsxts-language)
  - [Language primitives](#language-primitives)
  - [Canonical component order](#canonical-component-order)
  - [XTS example](#xts-example)
- [Component Authoring Summary](#component-authoring-summary)
  - [Filesystem structure](#filesystem-structure)
  - [Standard files](#standard-files)
- [Naming Conventions](#naming-conventions)
  - [Components, types, and files](#components-types-and-files)
  - [Variables](#variables)
  - [Constants](#constants)
  - [Methods and callbacks](#methods-and-callbacks)
  - [CSS variables](#css-variables)
- [Stacking Order](#stacking-order)
- [Component Standards](#component-standards)
- [Features](#features)
- [Installation](#installation)
- [Documentation Overview](#documentation-overview)
- [MIT Licence](#mit-licence)
- [Copyright](#copyright)

---

## XJS/XTS Language

XJS and XTS are documentation languages based on JSX and TSX. XJS describes a
JavaScript-oriented template and XTS adds TypeScript types. They are not tied to
React, Vue, Svelte, or another renderer and are not compiled by this package.

The language exists so one canonical template can express concepts shared by
multiple frameworks while allowing any ASCII symbol in a property name. This
makes framework-neutral directives such as `@click`, `#if`, `#ref`, and
`#style` possible without translating the documentation into a specific
framework's syntax.

### Language primitives

| Syntax | Meaning |
|---|---|
| `@event={handler}` | Binds a renderer event to a semantic handler, for example `@click={m.onClick}`. |
| `#if={condition}` | Conditionally includes an element. |
| `#else` | Supplies the alternative branch for the preceding `#if`. |
| `#ref={reference}` | Assigns a renderer-owned element or view reference. |
| `#style={value}` | Applies renderer-specific inline style values when the value cannot safely be shared through a stylesheet. |
| `<slot />` | Projects default content while preserving the component's semantic shell. |
| `<slot name="..." />` | Projects named content. It may receive `props`, fallback children, or a `map` function. |
| `<Render content={value} />` | Renders opaque content supplied through a renderable contract. Core logic must not inspect the framework node. |
| `setContext(key, value)` | Publishes framework-neutral component context for descendant templates. |
| `getContext(key)` | Reads framework-neutral component context. |

XJS/XTS examples must not use renderer-specific helpers such as `useSlots`,
`<Slots>`, `<Slot>`, React's `<GlobalContext>`, or `createElement`. Slot
projection always uses the lowercase `<slot />` intrinsic. Context publication
uses `setContext` before the template is returned.

### Canonical component order

Normalize props first, construct the mediator second, then read mediator state
and context. Use the short variables `p`, `m`, `s`, and `c` consistently:

```xts
export function MyComponent(props: MyComponentProps) {
  const p = withDefaultProps<MyComponentDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<MyComponentMediator>(myComponentMediator, p);
  const s = m.state;
  const c = m.getContext();

  // References, effects, lifecycle registration, and rendering follow.
}
```

Omit `s` or `c` when the mediator does not expose them, but never change the
relative order of the declarations that remain.

### XTS example

```xts
import { useMediator, withDefaultProps } from '@pastweb/x';
import { buttonMediator } from '@pastweb/components-core/Button';
import { DEFAULT_PROPS } from './constants';

export function Button(props: ButtonProps) {
  const p = withDefaultProps<ButtonDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ButtonMediator>(buttonMediator, p);
  const s = m.state;

  return (
    <button
      #ref={p.ref}
      type={p.type}
      class={p.cls('Button', p.className, {
        'is-disabled': s.isDisabled,
        'is-loading': s.isLoading,
      })}
      @click={m.onClick}
      disabled={s.isDisabled}
      aria-disabled={s.isDisabled}
      aria-busy={s.isLoading || undefined}
      tabIndex={p.tabIndex}
    >
      <slot
        map={(child, index) => (
          <span key={index} class={p.cls('item')}>{child}</span>
        )}
      />
      <span #if={s.isLoading} class={p.cls('loading')} role="status" aria-live="polite">
        <slot name="loading">Loading...</slot>
      </span>
    </button>
  );
}
```

The template describes semantics and behavior. A React renderer maps `@click`
to `onClick`, `#ref` to a React ref, and slots to its projection tools. A native
renderer maps the same intent to its own view and accessibility APIs rather
than copying HTML attributes.

## Component Authoring Summary

Every component is a self-contained public entrypoint under `src/`. The public
contract, mediator, style tokens, XTS documentation, and framework renderer
must remain synchronized.

### Filesystem structure

```txt
src/
  MyComponent/
    MyComponent.scss
    README.md
    _index.scss
    constants.ts
    index.ts
    myComponent.mediator.ts
    style.module.scss
    style.scss
    types.ts
    MySubcomponent/              # optional
      MySubcomponent.scss
      README.md                  # optional when documented by the parent
      constants.ts
      index.ts
      mySubcomponent.mediator.ts
      types.ts
    utils/                       # optional when shared helpers are needed
      index.ts
      helperName.ts

tests/
  MyComponent/
    MyComponent.node.test.ts
    MyComponent.web.test.ts
```

### Standard files

| File | Responsibility |
|---|---|
| `types.ts` | Public props, normalized default props, state, mediator, context, semantic event, and adapter contracts. |
| `constants.ts` | Default props, context keys, enum-like values, and stable internal constants. |
| `myComponent.mediator.ts` | Framework-neutral state and behavior. It receives normalized props and returns the mediator API. |
| `MyComponent.scss` | Canonical browser/Capacitor class and CSS-variable implementation. NativeScript styles use a separate explicit entrypoint when introduced. |
| `style.scss` | Forwards the component stylesheet. |
| `style.module.scss` | Forwards the public style entry for module-aware tooling. |
| `_index.scss` | SCSS package barrel. |
| `README.md` | Props, slots, CSS variables, XTS template, accessibility behavior, native mapping, and known limitations. |
| `index.ts` | Public TypeScript barrel. Export only the supported component contract. |
| `utils.ts` or `utils/` | Reusable helpers extracted from the mediator. Use a directory when the utility surface grows. |

Subcomponents follow the same structure and live inside the owning component,
for example `Accordion/AccordionPanel` or `Select/SelectItem`.

## Naming Conventions

### Components, types, and files

| Item | Convention | Examples |
|---|---|---|
| Component directory | PascalCase public component name | `Accordion`, `RangeSlider`, `WindowController` |
| Component stylesheet | PascalCase component name | `Accordion.scss`, `RangeSlider.scss` |
| Mediator file | camelCase component name plus `.mediator.ts` | `accordion.mediator.ts`, `rangeSlider.mediator.ts` |
| Helper file | camelCase exported helper name | `setRows.ts`, `calculateTime.ts` |
| Test file | PascalCase component plus environment suffix | `Accordion.node.test.ts`, `Accordion.web.test.ts` |
| Public types | PascalCase component name plus role suffix | `ButtonProps`, `ButtonDefaultProps`, `ButtonState`, `ButtonMediator`, `ButtonContext` |
| Root CSS class | PascalCase component name | `.Button`, `.AccordionPanel` |
| Part CSS class | descriptive camelCase | `.headerContent`, `.closeButton`, `.columnFilter` |
| State CSS class | `is-` plus lowercase kebab-case | `.is-disabled`, `.is-loading`, `.is-drag-over` |

File and exported symbol names must match. Do not preserve a misspelling in a
new API; retain an existing misspelled public name only as a documented
deprecated compatibility alias.

### Variables

Use the following local names at the start of component templates and framework
renderers:

| Name | Meaning |
|---|---|
| `p` | Props normalized with `DEFAULT_PROPS`. |
| `m` | Mediator created from the component mediator function and `p`. |
| `s` | Reactive mediator state. Declare it immediately after `m`. |
| `c` | Provided or consumed component context. Declare it after `s`, or after `m` when no state exists. |

Use descriptive camelCase names for all other variables and references, such as
`triggerRef`, `contentRef`, `isUnavailable`, and `visibleColumns`. Do not use a
platform class name as a core variable type or store DOM/native view instances
in mediator state.

### Constants

- Use uppercase snake case for exported constants: `DEFAULT_PROPS`,
  `ACCORDION_CONTEXT_KEY`, `INTERVAL_MS`, and `TOAST_REMOVED_EVENT`.
- Prefix subcomponent defaults when multiple default objects share a public
  entrypoint, for example `DEFAULT_ACCORDION_PANEL_PROPS`.
- Use PascalCase names for exported enums only when an enum is the intentional
  public API. Existing uppercase enum-like APIs remain supported, but new APIs
  should prefer typed `as const` objects or string unions when practical.
- Keep context-key values stable after publication. The exported symbol must
  end in `_CONTEXT_KEY`.
- Put helper-specific constants beside the helper rather than expanding the
  component-level constants file with unrelated implementation details.

### Methods and callbacks

- Use camelCase method names.
- Name behavior after intent: `onToggle`, `onOpen`, `onClose`, `onChange`,
  `moveColumn`, and `setColumnSize`.
- Do not encode an input device into shared behavior names. Prefer `onActivate`
  over `onClick`, `onTouchEnd`, or `onMouseUp` when the mediator represents a
  device-independent action. Renderer event names remain renderer-owned.
- Name renderer-hook lifecycle methods `useMounted` and `useBeforeUnmount`.
  Avoid `onMounted`, `onUnmount`, and `onBeforeUnmount`.
- Use `onTransitionEnd` when renderers report semantic animation completion.
  Correctness must also have a cleanup-safe fallback.
- Callback props use `on` plus the reported intent, such as `onOpenChange`,
  `onSizesChange`, or `onRowSelectionChange`.
- Mediator methods accept semantic values or small platform-neutral records.
  They must not expose DOM, React, TouchEvent, MouseEvent, NativeScript, or
  Electron classes through core public types.

### CSS variables

Component tokens use this fixed grammar:

```txt
--pw_<ComponentName>_<part>_<state>_<css-property>
```

- `pw` is the lowercase Pastweb namespace.
- `<ComponentName>` is the public PascalCase name.
- Use `root` when the token belongs to the component itself.
- Use `default` when no semantic state applies.
- Part and state names use lowercase kebab-case.
- The final field is the real lowercase kebab-case CSS property.
- Underscores separate the five metadata fields and never occur inside a field.

Examples:

```scss
--pw_Accordion_root_default_background-color
--pw_Button_root_disabled_opacity
--pw_Table_header_drag-over_box-shadow
--pw_WindowController_close-button_focus-visible_outline
```

The component stylesheet consumes the canonical variable. When renaming a
published token, the old name remains only as a deprecated fallback for the
documented compatibility period. Every component README includes a CSS
Variables table with the canonical name, part, state, CSS property, default,
description, and supported platforms.

## Stacking Order

Use the shared `--pw_z-index_*` variables for every component that creates a
stacking context. Do not introduce literal z-index values outside a component's
own local stacking context.

| Range | Tokens | Intended use |
|---:|---|---|
| `< 0` | `--pw_z-index_behind` | Decorative layers behind a component surface, such as a tooltip arrow border. |
| `0–9` | `--pw_z-index_local` | Parts within one component: arrows, selected tabs, local backdrops, and carousel slides. These values must not escape the component. |
| `10–49` | `--pw_z-index_sticky`, `--pw_z-index_sticky-header`, `--pw_z-index_loading` | Sticky tables, pinned columns, and local loading overlays that must cover sticky content. |
| `50–99` | `--pw_z-index_flyout` | Tooltips, dropdowns, selects, and sidebar flyouts. This layer remains above sticky content. |
| `600–699` | `--pw_z-index_sheet` | Sheets and modal panels. |
| `700–799` | `--pw_z-index_toast` | Toasts and application notifications. |
| `800–849` | `--pw_z-index_navigation` | Persistent application navigation and its internal flyouts. |
| `850–899` | `--pw_z-index_window-base`, `--pw_z-index_window-max` | Floating and modal windows. Window managers may allocate within this range to bring an active window forward. |
| `900–999` | `--pw_z-index_walktour` | Guided overlays such as Walktour. |
| `1000+` | `--pw_z-index_system` | Exceptional system-level UI only. Do not use for ordinary component overlays. |

1. Prefer DOM order before increasing a z-index within the same layer.
2. Use local values only inside an established component layer. A local
   `z-index: 1` is not a global overlay level.

TaskBar controls that manage floating windows should use
`--pw_z-index_window-max` so minimizing, restoring, and activating a window
remain possible when the window overlaps the taskbar.
3. Create a new token and document its range before adding a new global layer.
4. Avoid `transform`, `filter`, `opacity < 1`, `isolation`, and positioned
   ancestors with z-index on shared layout containers unless they intentionally
   create a stacking context.

```scss
.tooltipContent {
  z-index: var(--pw_z-index_flyout);
}

.thead {
  position: sticky;
  z-index: var(--pw_z-index_sticky);
}

.Walktour {
  z-index: var(--pw_z-index_walktour);
}
```

## Component Standards

- Mediators are framework- and DOM-independent. Platform measurement, focus,
  pointer capture, portals, and native services belong to renderer adapters.
- Browser, Capacitor, and Electron share the semantic web renderer. Optional
  Capacitor plugins and Electron main-process features remain behind typed
  adapters.
- Prefer native HTML controls and behavior. Meet WCAG 2.2 Level AA intent and
  the relevant WAI-ARIA Authoring Practices pattern.
- Native controls use their semantic activation event. Gesture surfaces use
  Pointer Events in the web renderer; core receives only semantic deltas or
  actions.
- Reflect component-owned state with root `is-<state>` classes while preserving
  mandatory native properties such as `disabled`, `checked`, and `required`.
- Interactive targets are at least 44 CSS pixels in browser-like renderers.
- Shared styles preserve visible focus, forced-colour behavior, and reduced
  motion.
- Tests use Vitest and titles following the `given..., when..., then...`
  convention. Node tests cover mediators; web tests cover rendered semantics,
  keyboard, focus, pointer behavior, and accessibility relationships.

## Features

- Framework-neutral component props, state, mediator, and context contracts.
- Canonical XJS/XTS rendering documentation for framework packages.
- Structured SCSS variables suitable for themes and component-editor tooling.
- Browser, Capacitor, and Electron compatibility boundaries.
- WCAG 2.2 AA, WAI-ARIA pattern, keyboard, focus, touch, reduced-motion, and
  forced-colour guidance.
- Per-component public entrypoints for tree-shakeable consumption.

## Installation

```bash
npm install @pastweb/components-core
# or
pnpm add @pastweb/components-core
# or
yarn add @pastweb/components-core
```

Framework applications also install the corresponding renderer package, such
as `@pastweb/react-components`.

## Documentation Overview

- The root README defines XJS/XTS and package-wide authoring conventions.
- `src/<Component>/README.md` defines each component's props, content/slots,
  CSS variables, canonical template, accessibility behavior, native mapping,
  and known limitations.
- `AGENTS.md` contains mandatory contribution and compatibility rules.
- `ROADMAP.md` tracks browser, Capacitor, Electron, and deferred platform work.
- `xjs-highlighter/` contains syntax-highlighting support for the documentation
  language.

See individual component READMEs for their complete public contracts and
[`ROADMAP.md`](./ROADMAP.md) for cross-platform remediation work.

## MIT Licence

This project is distributed under the MIT licence. See [`LICENSE`](./LICENSE)
for the complete licence text.

## Copyright

Copyright (c) 2025 pastweb.
