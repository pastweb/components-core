```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { pagination } from '@pastweb/components/Pagination';
import { DEFAULT_PROPS } from './constants';
import type { PaginationProps, PaginationDefaultProps, PaginationMediator } from './types';

export function Pagination(props: PaginationProps) {
  const p = withDefaultProps<PaginationDefaultProps>(props, DEFAULT_PROPS);
  const Button = p.button;
  const m = useMediator<PaginationMediator>(pagination, p);

  return (
    <div class={p.cls('Pagination')}>
      <Button disabled={m.state.current === 1} @click={m.onPrev}>
        <render #if={p.prev} content={p.prev} />
        <render #else={p.prev} content='Prev' />
      </Button>
      <div class={p.cls('pages')}>
        <Button
          #for={page of m.state.pages}
          class={p.cls('page', m.state.current === page ? 'is-active' : '')}
          @click={() => m.onPageChange(page)}
        >
          {page}
        </Button>
      </div>
      <Button disabled={m.state.current === p.total} @click={m.onNext}>
        <render #if={p.next} content={p.next} />
        <render #else={p.next} content='next' />
      </Button>
    </div>
  );
}
```
