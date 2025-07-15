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
      class={p.cls('ToastController', p.position)}
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