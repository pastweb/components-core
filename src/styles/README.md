# Stacking order

Use the shared `--pw_z-index_*` variables for every component that creates a
stacking context. Do not introduce literal z-index values outside a component's
own local stacking context.

## Scale

| Range | Tokens | Intended use |
|---:|---|---|
| `< 0` | `--pw_z-index_behind` | Decorative layers behind a component surface, such as a tooltip arrow border. |
| `0–9` | `--pw_z-index_local` | Parts within one component: arrows, selected tabs, local backdrops, carousel slides. These values must not be used to escape the component. |
| `10–49` | `--pw_z-index_sticky`, `--pw_z-index_sticky-header`, `--pw_z-index_loading` | Sticky tables, pinned columns, and local loading overlays that must cover sticky content. |
| `50–99` | `--pw_z-index_flyout` | Tooltips, dropdowns, selects, and sidebar flyouts. This layer must remain above sticky content. |
| `600–699` | `--pw_z-index_sheet` | Sheets and modal panels. |
| `700–799` | `--pw_z-index_toast` | Toasts and application notifications. |
| `800–849` | `--pw_z-index_navigation` | Persistent application navigation and its internal flyouts. |
| `850–899` | `--pw_z-index_window-base`, `--pw_z-index_window-max` | Floating and modal windows. Window managers may allocate within this range to bring an active window forward. |
| `900–999` | `--pw_z-index_walktour` | Guided overlays such as Walktour. Consumers may use this range for a tour-specific override. |
| `1000+` | `--pw_z-index_system` | Exceptional system-level UI only. Do not use for ordinary component overlays. |

## Rules

1. Prefer DOM order before increasing a z-index within the same layer.
2. Give a parent a shared layer only when a descendant must overlap a sibling
   stacking context. The SPA sidebar uses `--pw_z-index_navigation` so its
   collapsed-menu tooltips and option dropdown remain available above both
   sticky table headers and Sheets in the views sibling.
3. Use local values only inside an established component layer. A local
   `z-index: 1` is not a global overlay level.
4. Create a new token and document its range before adding a new global layer.
5. Avoid `transform`, `filter`, `opacity < 1`, `isolation`, and positioned
   ancestors with z-index on shared layout containers unless they are intended
   to create a stacking context.

## Examples

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
