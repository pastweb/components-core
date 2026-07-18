## WindowController

### Props
| PropName                | type                               | required | default | Description                                                   |
|-------------------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls                     | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| portalElement           | HTMLElement                       |    no    |    -    | DOM element to use as the portal container                    |
| entryId                 | string                             |    no    |    -    | unique ID for the portal entry point                          |
| portal                  | Portal                             |    no    |    -    | portal configuration object                                   |
| mode                    | 'modal' \| 'floating'              |    no    |  modal  | display mode ('modal' with backdrop or 'floating' without)    |
| moveCursor              | boolean                            |    no    |  true   | enable move cursor styling for dragging (in floating mode)    |
| resizable               | boolean                            |    no    |  false  | allow resizing the window                                     |
| resizeCursor            | boolean                            |    no    |  true   | enable resize cursor styling                                  |
| width                   | number                             |    no    |    -    | initial width of the window (applied as inline style)         |
| height                  | number                             |    no    |    -    | initial height of the window (applied as inline style)        |
| closeOnBackdropClick    | boolean                            |    no    |  true   | close the window on backdrop click (for modal mode)           |
| animLeaveTime           | number                             |    no    |   350   | time in milliseconds for leave animation before destroying    |
| onClose                 | () => void                         |    no    |   noop  | callback fired when the window is closed                      |
| onKeyDown               | (event: KeyboardEvent) => void     |    no    |   noop  | callback fired on keydown events in the window (e.g., for ESC)|
| childProps              | Record<string, any>                |    no    |    {}   | additional props to spread onto child elements                |

### Children
The content to render inside the window, with `childProps` spread onto the children.

```tsx
import { withDefaultProps, useBeforeMount, useRef, useMediator, provide, useMounted } from '@pastweb/x';
import { DEFAULT_PROPS, MODE } from './constants';
import { windowController, WINDOW_CONTEXT_KEY } from '@pastweb/components/WindowController';
import { WindowControllerProps, WindowControllerDefaultProps, WindowControllerMediator } from './types';

export function WindowController(props: WindowControllerProps) {
  const p = withDefaultProps<WindowControllerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<WindowControllerMediator>(windowController, p);
  const s = m.state;
  
  const windowRef = useRef<HTMLElement | null>(null);
  
  useBeforeMount(() => {
    const parentWindow = m.getParentWindow();
    setContext(WINDOW_CONTEXT_KEY, parentWindow);
  });

  useMounted(() => m.onMounted(windowRef.value as HTMLElement));

  return (
    <div
      #if={p.mode === MODE.floating}
      #ref={windowRef}
      class={p.cls('window', {
        windowEnter: s.isOpen,
        windowLeacr: !s.isOpen,
        dragable: p.mode === MODE.floating,
      })}
      tabIndex="0"
      @keydown={m.onKeyDown}
    >
      <children { ...p.childProps } />
    </div>
    <div #else class={p.cls('WindowController')} >
      <div class={p.cls('backdrop')} @click={m.onBackdropClick} />
      <div
        #ref={windowRef}
        class={p.cls('modal', {
          windowEnter: s.isOpen,
          windowLeave: !s.isOpen,
        })}
        tabIndex="0"
        @keydown={m.onKeyDown}
      >
        <children { ...p.childProps } />
      </div>
    </div>
  );
}
```
