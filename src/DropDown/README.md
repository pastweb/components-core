
## DropDown

### Props
| PropName        | type                               | required | default | Description                                                   |
|-----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls             | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| arrow           | boolean                            |    no    |  true   | show an arrow/triangle indicator on the dropdown              |
| className       | string                             |    no    |    ""   | additional classes to be applied to the dropdown container    |
| contentClassName| string                             |    no    |    ""   | additional classes to be applied to the dropdown content      |
| offset          | number                             |    no    |    2    | offset distance in pixels from the trigger to the dropdown    |
| disabled        | boolean                            |    no    |  false  | disable the dropdown (prevents opening)                       |
| isVisible       | boolean                            |    no    |  false  | controls if the dropdown is initially visible                 |
| visibleOn       | 'click' \| 'over' \| 'context'     |    no    |  click  | trigger event for showing the dropdown ('over' for hover)     |
| placement       | string                             |    no    | bottom  | placement position relative to trigger (e.g., 'top', 'bottom')|
| hideOnClickOut  | boolean                            |    no    |  true   | hide dropdown when clicking outside                           |
| hideOnBlur      | boolean                            |    no    |  true   | hide dropdown when focus is lost                              |
| position        | 'absolute' \| 'fixed'              |    no    | absolute| positioning strategy for the dropdown container               |
| onClick         | () => void                         |    no    |   noop  | callback for click events on the trigger                      |
| onContext       | () => void                         |    no    |   noop  | callback for right-click (context menu) events                |
| onClickOut      | () => void                         |    no    |   noop  | callback when clicking outside the dropdown                   |
| onMouseEnter    | () => void                         |    no    |   noop  | callback for mouse enter on the trigger                       |
| onMouseLeave    | () => void                         |    no    |   noop  | callback for mouse leave on the trigger                       |

### Children
The content rendered as the dropdown trigger (e.g., a button, text, or element that activates the dropdown).

### Slots
| SlotName | Description | Default Content |
|----------|-------------|-----------------|
| header   | Custom header content inside the dropdown | - |
| (default)| Main content of the dropdown | - |
| footer   | Custom footer content inside the dropdown | - |


```tsx
import { effect } from 'x';
import { setRef, useBeforeUnmount, useMediator, useMounted, useRef, withDefaultProps } from '@pastweb/x';
import { dropdown } from '@pastweb/components/DropDown';
import { DEFAULT_PROPS } from './constants';
import type { DropDownDefaultProps, DropDownMediator, DropDownProps } from './types';

export function DropDown((props: DropDownProps) {
  const p = withDefaultProps<DropDownDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<DropDownMediator>(dropdown, p);
  const s = m.state;

  const rootRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  effect(() => m.setArrowRef(arrowRef.value), () => p.arrow);

  useMounted(() => {
    if (!rootRef.value || !targetRef.value || !containerRef.value || !contentRef.value) return;
    m.onMounted(rootRef.value, targetRef.value, containerRef.current, contentRef.value, arrowRef.value);
    setRef(ref, rootRef.value);
  });

  useBeforeUnmount(() => m.onUnmount());

  return (
    <span
      #ref={rootRef}
      class={p.cls('DropDown')}
      @click={m.onClick}
      @contextMenu={m.onContext}
      @mouseEnter={m.onMouseEnter}
      @mouseLeave={m.onMouseLeave}
      @blur={m.onBlur}
    >
      <span #ref={targetRef}>
        <children />
      </span>
      <div
        #ref={containerRef}
        class={p.cls('container', { ['is-visible']: s.isVisible }, p.className)}
        #style={{ position: p.position }}
      >
        <div #ref={contentRef} class={p.cls('content', p.contentClassName)}>
          <slot name='header' />
          <slot />
          <slot name='footer' />
        </div>
        <div #if={p.arrow} #ref={arrowRef} class={p.cls('arrow')}>
          <div class={p.cls('triangle')} />
        </div>
      </div>
    </span>
  );
}
```

### Usage

```tsx
import { Button } from '@pastweb/component-x/Button';
import { DropDown } from '@pastweb/component-x/DropDown';

interface DropDownButtonProps {
  content: HTMLElement[];
}

export function DropDownButton(props: DropDownButtonProps) {
  return (
    <DropDown>
      <template>
        <ul>
          <li #for={element of props.content}>{ element }</li>
        </ul>
      </template>
      <Button>
        <children />
      </Button>
    </DropDown>
  );
}
```
