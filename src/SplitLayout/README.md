## SplitLayout

### Props
| PropName        | type                               | required | default     | Description                                                   |
|-----------------|------------------------------------|----------|-------------|---------------------------------------------------------------|
| cls             | (...args: ClassValue[]) => string; |    yes   |    -        | function to handle CssModules classes and classes switching   |
| direction       | 'horizontal' \| 'vertical' \| string | no    | horizontal  | layout direction for the splitters and panels                 |
| sizes           | number[]                           |    no    |    []       | initial relative sizes of the panels (e.g., [50, 50] for equal split) |
| onSizesChange   | (sizes: number[]) => void          |    no    |   noop      | callback fired when the panel sizes are resized               |

### Children
The child components to render as resizable panels in the split layout. Each child is wrapped in a div, with a draggable splitter inserted after it (except the last child). The mediator handles resizing via mouse events on the splitters.

```tsx
import { withDefaultProps, useMediator, useRef, useBeforeUnmount } from '@pastweb/react';
import { DEFAULT_PROPS } from './constants';
import { splitLayout } from '@pastweb/components/SplitLayout';
import { SplitLayoutProps, SplitLayoutDefaultProps, SplitLayoutMediator } from './types';

export function SplitLayout(props: SplitLayoutProps) {
  const p = withDefaultProps<SplitLayoutDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SplitLayoutMediator>(splitLayout, p);

  const container = useRef<HTMLElement | null>(null);

  useBeforeUnmount(() => m.onUnmounted());

  return (
    <div #ref={container} class={p.cls('SplitLayout', p.direction)}>
      <children #each={(child, i)}>
        <div>{ child }</div>
        <div
          class={p.cls(`splitter-${p.direction}`)}
          @mousedown={(e) => m.onMouseDown(e.nativeEvent, i)}
        />
      </children>
    </div>
  );
}
```
