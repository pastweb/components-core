## Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| className      | string                             |    no    |    ""   | additional classes to be applied to the button                |
| onClick        | (event: MouseEvent) => void        |    no    |   noop  | onclick function handler                                      |
| disabled       | boolean                            |    no    |  false  | disable the button                                            |
| tabIndex       | number                             |    no    |    0    | tab index for keyboard navigation                             |

## Slots
| SlotName | Description | Default Content |
|----------|-------------|-----------------|
| loading  | Custom loading indicator (shown if `className` includes `'is-loading'`) | "loading..." |

```tsx
import { isObject } from '@pastweb/tools';
import { withDefaultProps } from '@pastweb/x';
import { button } from '@pastweb/components/Button';
import { DEFAULT_PROPS } from './constants';
import { ButtonDefaultProps, ButtonProps } from './types';

export function Button(props: ButtonProps) {
  const p = withDefaultProps<ButtonDefaultProps>(props, DEFAULT_PROPS);

  return (
    <button
      #ref={p.ref}
      class={p.cls('Button', p.className)}
      @click={p.onClick}
      disabled={p.disabled}
      tabIndex={p.tabIndex}
    >
      <children #each={child}>
        <span #if={child && (!isObject(child) || (typeof child === 'function' && (child as Function).name !== 'Template'))}>
          <render content={child} />
        </span>
      </children>
      <div #if={p.className.includes('is-loading')} class={p.cls('loading')}>
        <slot name='loading'>
          Loading...
        </slot>
      </div>
    </button>
  );
}
```
