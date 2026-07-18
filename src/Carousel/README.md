## CarouselItem
| PropName | type | required | default | Description |
|----------|------|----------|---------|-------------|
| content  | any  | yes      | -       | The content (JSX/element) to render inside the carousel item |
| name     | string | yes    | -       | Unique identifier name for the carousel item |

## Props
| PropName          | type                               | required | default | Description                                                   |
|-------------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls               | (...args: ClassValue[]) => string; | yes      | -       | function to handle CssModules classes and classes switching   |
| autoPlay          | boolean                            | no       | false   | enable automatic sliding through items                        |
| autoPlayInterval  | number                             | no       | 3000    | interval in milliseconds for autoPlay advancement             |
| className         | string                             | no       | ""      | additional classes to be applied to the carousel              |
| showCommands      | boolean                            | no       | true    | show navigation (prev/next) buttons                           |
| current           | number                             | no       | 0       | initial index of the active carousel item                     |
| items             | CarouselItem[]                     | yes      | -       | array of items to display in the carousel                     |

## Slots
| SlotName | Description | Props |
|----------|-------------|-------|
| commands | Slot for custom navigation controls (shown if `showCommands` is true) | `{ prev: () => void; next: () => void; }` |

```tsx
import { useMediator, withDefaultProps } from '@pastweb/x';
import { carousel, DEFAULT_PROPS, type CarouselMediator } from '@pastweb/components/Carousel';
import type { CarouselDefaultProps, CarouselProps } from './types';

export function Carousel(props: CarouselProps) {
  const p = withDefaultProps<CarouselDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<CarouselMediator>(carousel, p);
  const s = m.state;

  return (
    <div class={p.cls('Carousel', p.className)}>
      <div class={p.cls('carouselInner')} #style={{ transform: `translateX(-${s.current * 100}%)` }}>
        <div
          #for={(item, i) of items}
          key={`${item.name}_${i}`}
          class={p.cls('carouselItem', { active: i === s.current })}
        >
          <render content={item.content} />
        </div>
      </div>
      <slot #if={p.showCommands} name='commends' props={{ prev: m.prev, next: m.next }}>
        <button class={p.cls('prev')} @click={m.prev}>
          ◄
        </button>
        <button class={p.cls('next')} @click={m.next}>
          ►
        </button>
      </slot>
    </div>
  );
}
```
