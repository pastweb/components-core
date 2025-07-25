```tsx
import { carousel, DEFAULT_PROPS, type CarouselMediator } from '@pastweb/components/Carousel';
import { useMediator, withDefaultProps } from '@pastweb/x';
import type { CarouselDefaultProps, CarouselProps } from './types';

export function Carousel(props: CarouselProps) {
  const p = withDefaultProps<CarouselDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<CarouselMediator>(carousel, p);
  const s = m.state;

  return (
    <div class={p.cls('Carousel', p.className)}>
      <div class={p.cls('carouselInner')} style={{ transform: `translateX(-${s.current * 100}%)` }}>
        {p.items.map((item, i) => (
          <div
            key={`${item.name}_${i}`}
            className={p.cls('carouselItem', { active: i === s.current })}
          >
            {item.content}
          </div>
        ))}
      </div>
      <button #if={p.commands} className={p.cls('prev')} onClick={m.prev}>
        ◄
      </button>
      <button #if={p.commands} className={p.cls('next')} onClick={m.next}>
        ►
      </button>
    </div>
  );
}
```
