## Tooltip

### Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| className      | string                             |    no    |    ""   | additional classes to be applied to the tooltip wrapper       |
| content        | string                             |    yes   |    ""   | text content to display inside the tooltip                    |
| placement      | Placement                          |    no    |   top   | position of the tooltip relative to the trigger (e.g., 'top', 'bottom') |
| disabled       | boolean                            |    no    |  false  | disable the tooltip (prevents showing)                        |

### Children
The content to render as the tooltip trigger (e.g., text, icon, or element that activates the tooltip on hover/focus).

```tsx
import { useBeforeUnmount, useMediator, useMounted, useRef, withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS, tooltip } from '@pastweb/components/Tooltip';
import type { TooltipDefaultProps, TooltipMediator, TooltipProps } from './types';

export function Tooltip(props: TooltipProps) {
  const p = withDefaultProps<TooltipDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TooltipMediator>(tooltip, p);
  const s = m.state;

  const rootRef = useRef<HTMLSpanElement | null>(null);
  const targetRef = useRef<HTMLSpanElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  useMounted(() => {
    const root = rootRef.value as HTMLSpanElement;
    const target = targetRef.value as HTMLSpanElement;
    const tooltip = tooltipRef.value as HTMLDivElement;
    const arrow = arrowRef.value as HTMLDivElement;
    m.onMounted(root, target, tooltip, arrow);
  });

  useBeforeUnmount(() => m.beforeUnmount());

  return (
    <span #ref={rootRef} class={p.cls('Tooltip', p.className)}>
      <span #ref={targetRef}>
        <children />
      </span>
      <div #ref={tooltipRef} class={p.cls(`tooltipContent${s.isVisible ? ' is-visible' : ''}`, p.className)}>
        {content}
        <div #ref={arrowRef} class={p.cls('arrow')}>
          <div class={p.cls('triangle')}/>
        </div>
      </div>
    </span>
  );
}
```
