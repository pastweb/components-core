```tsx
import { ScrollAreaProps } from './types';

export function ScrollArea(props: ScrollAreaProps) {
  return (
    <div class={props.cls('ScrollArea')}>
      <div class={props.cls('content', {
        ['hide-x']: props.hideX,
        ['hide-y']: props.hideY,
        ['scroll-bottom']: props.scrollBottom,
        ['scroll-right']: props.scrollRight,
      })}
      #style={props.contentPadding ? { padding: props.contentPadding } : {}}
      >
        <children />
      </div>
    </div>
  );
}
```