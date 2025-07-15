```tsx
import { withDefaultProps, useRef, useMediator, provide, useMounted } from '@pastweb/x';
import { slideController } from '@pastweb/components/SlideController';
import { DEFAULT_PROPS } from './constants';
import { SlideControllerProps, SlideControllerDefaultProps, SlideControllerMediator } from './types';

export function SlideController(props: SlideControllerProps) {
  const p = withDefaultProps<SlideControllerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SlideControllerMediator>(slideController, p);
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
        tabIndex="0"
        class={p.cls('slide', {
          [`slide-open-${p.direction}`]: p.direction && s.isOpen,
          [`slide-close-${p.direction}`]: p.direction && !s.isOpen,
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
      tabIndex="0"
      class={p.cls('slide', {
        [`slide-open-${p.direction}`]: p.direction && s.isOpen,
        [`slide-close-${p.direction}`]: p.direction && !s.isOpen,
      })}
      #style={{ top: p.top, left: p.left, bottom: p.bottom, right: p.right, width: p.width, height: p.height }}
      @keydown={m.onKeyDown}
    >
      <children { ...p.childProps } />
    </div>
  );
}
```