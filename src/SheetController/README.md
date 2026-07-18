## SheetController

### Props
| PropName                | type                               | required | default | Description                                                   |
|-------------------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls                     | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| portalElement           | HTMLElement                       |    no    |    -    | DOM element to use as the portal container                    |
| portal                  | Portal                             |    no    |    -    | portal configuration object                                   |
| entryId                 | string                             |    no    |    -    | unique ID for the portal entry point                          |
| backdrop                | boolean                            |    no    |  false  | enable a backdrop overlay behind the slide                    |
| direction               | string                             |    no    |  left   | slide animation direction (e.g., 'left', 'right', 'top')      |
| height                  | number \| string                   |    no    |    -    | height of the slide panel (applied as inline style)           |
| width                   | number \| string                   |    no    |    -    | width of the slide panel (applied as inline style)            |
| top                     | number                             |    no    |    -    | top position offset for the slide (applied as inline style)   |
| bottom                  | number                             |    no    |    -    | bottom position offset for the slide (applied as inline style)|
| left                    | number                             |    no    |    -    | left position offset for the slide (applied as inline style)  |
| right                   | number                             |    no    |    -    | right position offset for the slide (applied as inline style) |
| animationTime           | number                             |    no    |   400   | duration of the slide animation in milliseconds               |
| closeOnBackdropClick    | boolean                            |    no    |  true   | close the slide when clicking the backdrop                    |
| onClose                 | () => void                         |    no    |   noop  | callback fired when the slide is closed                       |
| onKeyDown               | (event: KeyboardEvent) => void     |    no    |   noop  | callback fired on keydown events in the slide (e.g., for ESC) |
| childProps              | Record<string, any>                |    no    |    {}   | additional props to spread onto child elements                |

### Children
The content to render inside the slide panel, with `childProps` spread onto the children.

```tsx
import { withDefaultProps, useRef, useMediator, provide, useMounted } from '@pastweb/x';
import { slideController } from '@pastweb/components/SheetController';
import { DEFAULT_PROPS } from './constants';
import { SheetControllerProps, SheetControllerDefaultProps, SheetControllerMediator } from './types';

export function SheetController(props: SheetControllerProps) {
  const p = withDefaultProps<SheetControllerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SheetControllerMediator>(sheetController, p);
  const s = m.state;

  const slideRef = useRef<HTMLElement | null>(null);
  const parentSlide = m.getParentSlide();

  useMounted(() => m.onMounted(slideRef as HTMLElement));

  return (
    <div
      #if={p.backdrop}
      class={p.cls('SlideController')}
      #style={{ animationDuration: `${(p.animationTime / 1000).toFixed(2)}s` }}
    >
      <div class={p.cls('backdrop')} @click={m.onBackdropClick} />
      <div
        #ref={slideRef}
        tabIndex='0'
        class={p.cls('slide', {
          [`slide-open-${p.direction}`]: s.isOpen,
          [`slide-close-${p.direction}`]: !s.isOpen,
        })}
        #style={{ top: p.top, left: p.left, bottom: p.bottom, right: p.right, width: p.width, height: p.height }}
        @keydown={m.onKeyDown}
      >
        <children { ...p.childProps } />
      </div>
    </div>
    <div
      #else
      #ref={slideRef}
      tabIndex='0'
      class={p.cls('slide', {
        [`slide-open-${p.direction}`]: s.isOpen,
        [`slide-close-${p.direction}`]: !s.isOpen,
      })}
      #style={{ top: p.top, left: p.left, bottom: p.bottom, right: p.right, width: p.width, height: p.height }}
      @keydown={m.onKeyDown}
    >
      <children { ...p.childProps } />
    </div>
  );
}
```
