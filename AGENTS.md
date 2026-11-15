# `@pastweb/components-core` contribution guide

## Package identity

`@pastweb/components-core` owns Pastweb's public, framework-neutral component
contracts. It contains component props and default values, mediator behavior,
semantic state, context contracts, shared style tokens, and XJS/XTS rendering
templates. React, Vue, Capacitor, and NativeScript packages adapt these contracts
without redefining their behavior.

The documented README contract and the XJS/XTS template are canonical. Native
renderers map the same intent to native views and accessibility APIs rather than
copying web markup or ARIA attributes.

## Architectural boundaries

- Keep mediators and shared types independent of React, Vue, DOM renderers,
  NativeScript, Capacitor plugins, and private application packages.
- Keep rendering-specific concerns in framework packages. Shared code may model
  semantic state and interaction intent, but it must not access `window`,
  `document`, native views, DOM events, or layout APIs.
- Keep the contracts usable by React, Vue, Capacitor, NativeScript, and future
  renderers.
- Keep component types, default props, mediator state and methods, context,
  README tables, slots, styles, and XJS/XTS templates synchronized.

## Non-negotiable component standards

- Treat WCAG 2.2 AA and the relevant WAI-ARIA Authoring Practices pattern as the
  minimum web accessibility target. Prefer native semantics and keyboard support.
- Keep generated IDs and accessibility relationships mediator-owned and stable;
  release generated IDs during `useBeforeUnmount`.
- Normalize semantic state once in the mediator and expose it to every renderer.
  Renderers must not independently reinterpret disabled, open, selected, busy,
  labelled, or unavailable state.
- Keep the canonical style contract portable: component, part, and state classes
  are public API, and renderer-specific style entry points must remain explicit.
- Keep public documentation safe for release and document accessibility,
  keyboard behavior, content guidance, and known limitations.

## Source and API discipline

- Organize implementation by component and feature. Prefer named exports and
  deliberate local and package-root barrels.
- Type exported object constants, including `DEFAULT_PROPS`, directly on the
  declaration; do not use a trailing `satisfies` clause.
- Use `@pastweb/tools` root imports in README and TSDoc examples when a symbol is
  exported there; use a subpath only for symbols unavailable from the root or for
  a subpath-specific example.
- Keep public CSS variable names and event contracts stable. Record intentional
  breaking changes in release notes and update all renderer consumers together.

## Related guidance

Detailed implementation, cross-runtime, styling, rendering, testing, and review
rules are in [`SKILLS.md`](./SKILLS.md). Apply both documents when changing this
package.
