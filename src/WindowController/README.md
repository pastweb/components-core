```tsx
import { withDefaultProps, useRef, useMediator, provide, useMounted } from '@pastweb/x';
import { DEFAULT_PROPS, MODE } from './constants';
import { windowController } from '@pastweb/components/WindowController';
import { WindowControllerProps, WindowControllerDefaultProps, WindowControllerMediator } from './types';

export function WindowController(props: WindowControllerProps) {
  const p = withDefaultProps<WindowControllerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<WindowControllerMediator>(windowController, p);
  const s = m.state;
  
  const windowRef = useRef<HTMLElement | null>(null);
  
  const parentWindow = m.getParentWindow();
  provide('$$parentWindow', parentWindow);

  useMounted(() => m.onMounted(windowRef.value as HTMLElement));

  return (
    <div
      #if={p.mode === MODE.floating}
      #ref={windowRef}
      class={p.cls('window', s.animationClass, { dragable: p.mode === MODE.floating })}
      tabIndex="0"
      @keydown={m.onKeyDown}
    >
      <children />
    </div>
    <div #else class={p.cls('WindowController')} >
      <div class={p.cls('backdrop')} @click={m.onBackdropClick} />
      <div
        #ref={windowRef}
        class={p.cls('modal', s.animationClass)}
        tabIndex="0"
        @keydown={m.onKeyDown}
      >
        <children />
      </div>
    </div>
  );
}
```