# Table

Table provides data-grid primitives for column visibility, ordering, pinning,
sorting, filtering, grouping, expansion, and row selection. The mediator owns
the table state and generated identifiers; framework renderers only connect it
to their native table elements.

## Identifier lifecycle

Each mediator instance creates an identifier with `idCache.getId('table')`.
Renderers use `m.id` as the prefix for header and cell identifiers, keeping ARIA
relationships unique across multiple tables. `m.useBeforeUnmount()` clears both
row identity records and the generated identifier.

## Mediator API

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique generated prefix for table accessibility identifiers. |
| `state` | `TableState` | Reactive columns, rows, controlled values, and drag state. |
| `table` | `TableInstance` | Public table instance used by consumers and slots. |
| `onMounted` | `(element: HTMLTableElement) => void` | Attaches the rendered table so header groups can be measured. |
| `onScroll` | `(event: unknown) => void` | Forwards scrolling from the renderer's scrollable table body. |
| `useBeforeUnmount` | `() => void` | Releases row IDs and the table identifier. |

## Renderer contract

```xts
import { useBeforeUnmount, useMediator, useMounted, withDefaultProps } from '@pastweb/x';
import { tableMediator } from '@pastweb/components-core/Table';
import { DEFAULT_PROPS } from './constants';

export function Table(props: TableProps) {
  const p = withDefaultProps<TableDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TableMediator>(tableMediator, p);
  const s = m.state;

  useMounted(element => m.onMounted(element));
  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <table aria-label={p.caption ? undefined : p.ariaLabel}>
      <caption #if={p.caption}>{p.caption}</caption>
      <thead>
        <tr #for={group of s.headerGroups}>
          <th
            #for={header of group.headers}
            id={`${m.id}-${header.column.id}`}
            scope="col"
          >
            <render content={header.column.columnDef.header} props={{ column: header.column }} />
          </th>
        </tr>
      </thead>
      <tbody>{/* render s.rows with the same m.id prefix for labelled cells */}</tbody>
    </table>
  );
}
```

Always register `m.useBeforeUnmount` in the framework renderer. Do not create
table identifiers in a framework-specific hook: a mediator-owned ID makes the
same accessibility contract portable to every supported renderer.

## Body scrolling

Renderers should attach `m.onScroll` to the scrollable element that contains the
table body. The core mediator deliberately forwards the event without assuming
a browser event type, so each renderer can use its native event while consumers
can implement behaviors such as infinite loading.

```ts
<div onScroll={m.onScroll}>
  <table><!-- rows --></table>
</div>
```
