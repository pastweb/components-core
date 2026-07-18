## Pagination

### Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| button         | any                                |    yes   |    -    | The Button component to use for navigation and page buttons   |
| total          | number                             |    yes   |    -    | Total number of pages                                         |
| current        | number                             |    yes   |    -    | Initial current page (1-based index)                          |
| onChange       | (page: number) => void             |    no    |   noop  | callback fired when the current page changes                  |
| className      | string                             |    no    |    ""   | additional classes to be applied to the pagination            |
| prev           | any                                |    no    |    ◄    | content for the previous button (string or JSX)               |
| next           | any                                |    no    |    ►    | content for the next button (string or JSX)                   |


```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { pagination } from '@pastweb/components/Pagination';
import { DEFAULT_PROPS } from './constants';
import type { PaginationProps, PaginationDefaultProps, PaginationMediator } from './types';

export function Pagination(props: PaginationProps) {
  const p = withDefaultProps<PaginationDefaultProps>(props, DEFAULT_PROPS);
  const Button = p.button;
  const m = useMediator<PaginationMediator>(pagination, p);
  const s = m.state;

  return (
    <div class={p.cls('Pagination', p.className)}>
      <Button disabled={s.current === 1} @click={m.onPrev}>
        <render content={p.prev} />
      </Button>
      <div class={p.cls('pages')}>
        <Button
          #for={page of s.pages}
          class={p.cls('page', s.current === page ? 'is-active' : '')}
          @click={() => m.onPageChange(page)}
        >
          {page}
        </Button>
      </div>
      <Button disabled={s.current === p.total} @click={m.onNext}>
        <render content={p.next} />
      </Button>
    </div>
  );
}
```
