## ToastController

### Enums

#### PLACEMENT
| Value        | Description                  |
|--------------|------------------------------|
| topRight     | Top-right positioned toast   |
| topCenter    | Top-center positioned toast  |
| topLeft      | Top-left positioned toast    |
| bottomRight  | Bottom-right positioned toast|
| bottomCenter | Bottom-center positioned toast|
| bottomLeft   | Bottom-left positioned toast |

#### ANIMATION
| Value  | Description                  |
|--------|------------------------------|
| bounce | Bounce animation             |
| fade   | Fade animation               |
| flip   | Flip animation               |
| slide  | Slide animation              |
| zoom   | Zoom animation               |

### Props
| PropName            | type                               | required | default      | Description                                                   |
|---------------------|------------------------------------|----------|--------------|---------------------------------------------------------------|
| cls                 | (...args: ClassValue[]) => string; |    yes   |    -         | function to handle CssModules classes and classes switching   |
| portal              | Portal                             |    no    |    -         | portal configuration object                                   |
| portalElement       | HTMLElement                        |    no    |    -         | DOM element to use as the portal container                    |
| entryId             | string                             |    no    |    -         | unique ID for the portal entry point                          |
| placement           | PLACEMENT                          |    no    | topRight     | position of the toast (e.g., 'top-right', 'bottom-center')    |
| padding             | number                             |    no    |    15        | padding inside the toast (applied as inline style)            |
| delay               | number                             |    no    |    5         | delay before showing the toast (in seconds)                   |
| timeUpdate          | number                             |    no    |    10        | interval for updating the toast timer (in seconds)            |
| animation           | string                             |    no    |  slide       | animation type (one of ANIMATION enum values)                 |
| animationDuration   | number                             |    no    |   500        | duration of the animation in milliseconds                     |
| closeOnEscKey       | boolean                            |    no    |   true       | close the toast on ESC key press                              |
| pauseTimerOnOver    | boolean                            |    no    |   true       | pause the auto-close timer on mouse over                      |
| resetTimerOnPause   | boolean                            |    no    |  false       | reset the timer when pausing                                  |
| onClose             | () => void                         |    no    |   noop       | callback fired when the toast is closed                       |
| onDestroy           | () => void                         |    no    |   noop       | callback fired when the toast is destroyed                    |
| onKeyDown           | (e: any) => void                   |    no    |   noop       | callback fired on keydown events in the toast                 |

### Children
The content to render inside the toast body.

```tsx
import { useRef, withDefaultProps, useMediator, provide, useMounted } from '@pastweb/x';
import { DEFAULT_PROPS, JUSTIFY } from './constants';
import { toastController } from '@pastweb/components/ToastController';
import { ToastControllerProps, ToastControllerDefaultProps, ToastControllerMediator } from './types';

export function ToastController(props: ToastControllerProps) {
  const p = withDefaultProps<ToastControllerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ToastControllerMediator>(toastController, p);
  const s = m.state;
  
  const toastRef = useRef<HTMLElement | null>(null);
  
  const parentToast = m.getParentToast();
  
  provide('$$parentToast', parentToast);

  useMounted(() => m.onMounted(toastRef.value as HTMLElement));

  return (
    <div
      #ref={toastRef}>
      class={p.cls('ToastController', p.placement)}
      #style={{ [s.y]: s.top || s.bottom, justifyContent: JUSTIFY[s.x] }}
      <div
        class={p.cls('toast', {
          [`${p.animation}-in-${s.x}-${s.y}`]: s.isOpen,
          [`${p.animation}-out-${s.x}-${s.y}`]: !s.isOpen,
        })}
        #style={{ padding: p.padding, animationDuration: `${p.animationDuration}ms` }}
        tabIndex="0"
        @keydown={m.onKeyDown}
        @mouseover={m.onMouseOver}
        @mouseleave={m.onMouseLeave}
      >
        <cihldren />
      </div>
    </div>
  );
}
```
