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