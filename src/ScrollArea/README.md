## ScrollArea

### Props
| PropName         | type                               | required | default | Description                                                   |
|------------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls              | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| hideX            | boolean                            |    no    |  false  | hide the horizontal scrollbar                                 |
| scrollRight      | boolean                            |    no    |  false  | align the scroll position to the right                        |
| hideY            | boolean                            |    no    |  false  | hide the vertical scrollbar                                   |
| scrollBottom     | boolean                            |    no    |  false  | align the scroll position to the bottom                       |
| contentPadding   | number \| string                   |    no    |    -    | padding for the scrollable content area (applied as inline style) |

### Children
The content to render inside the scrollable area (`.content`).

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
