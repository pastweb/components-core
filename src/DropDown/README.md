### Implementartion

The DropDown Component implementation needs a 'props' extension for other 2 properties:
* `target`: the component wehre the DropDown is attached.
* `content`: the component to be rendered inside the DropDown.

```tsx
import { dropdown } from '@pastweb/components/DropDown';
import { useMediator, useMounted, useRef, withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { DropDownDefaultProps, DropDownMediator, DropDownProps } from './types';

export function DropDown(props: DropDownProps) {
  const p = withDefaultProps<DropDownDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<DropDownMediator>(dropdown, p);
  const s = m.state;

  const rootRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const arrowRef = useRef<HTMLElement | null>(null);

  useMounted(() => m.onMounted(rootRef, targetRef, contentRef, arroowRef));
  useBeforeUnmount(m.onUnmounted);

  return (
    <span #ref={rootRef} class={p.cls('DropDown', p.className)}>
      <span #ref={targetRef}>
        {p.children}
      </span>
      <div
        #ref={contentRef}
        class={p.cls('content', { ['is-visible']: s.isVisible })}
        #style={{ position: p.position }}
      >
        {p.header}
        {p.content}
        {p.footer}
        <div #ref={arrowRef} class={p.cls('arrow')}>
          <div class={p.cls('triangle')}/>
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
    <DropDown
      content={
        <ul>
          <li #for={element of props.content}>{ element }</li>
        </ul>
      }
    >
      <Button>
        <children />
      </Button>
    </DropDown>
  );
}
```
