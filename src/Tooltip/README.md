```tsx
import { withDefaultProps, useMediator, useRef, useBeforeUnmount, useMounted } from '@pastweb/x';
import { DEFAULT_PROPS, tooltip } from '@pastweb/components/Tooltip';
import type { TooltipProps, TooltipDefaultProps, TooltipMediator } from './types';

export function Tooltip(props: TooltipProps) {
  const p = withDefaultProps<TooltipDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TooltipMediator>(tooltip, p);
  const s = m.state;

  const targetRef = useRef<HTMLSpanElement | null>(null);

  useMounted(() => {
    const target = targetRef.value as HTMLSpanElement;
    m.onMounted(target);
  });

  useBeforeUnmount(() => m.beforeUnmount());

  return (
    <span #ref={targetRef} class={p.cls('Tooltip', p.className)}>
      <children />
      <div class={p.cls(`tooltipContent${s.isVisible ? ' is-visible' : ''}`, p.className)}>
        {content}
        <div class={p.cls('arrow')}>
          <div class={p.cls('triangle')}/>
        </div>
      </div>
    </span>
  );
}
```