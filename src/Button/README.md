## Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| class          | string                             |    no    |    ""   | classes to be applied                                         |
| onClick        | (event: MouseEvent) => void        |    no    |   noop  | onclick function handler                                      |
| disabled       | boolean                            |    no    |  false  | disable the button                                            |
| loading?: any; | any                                |    no    |    -    | the component to be rendered if the class `is-loading` is set |

## Notes
- the `ref` attribute is intended to be the HTMLElement reference to be forwarded using the props Object.

```tsx
import { withDefaultProps } from '@pastweb/x';
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
        <span>
          <render content={child} />
        </span>
      </children>
      <div
        #if={p.loadingComponent && p.className.includes('is-loading')}
        class={p.cls('loading')}
      >
        { p.loadingComponent }
      </div>
    </button>
  );
}
```
