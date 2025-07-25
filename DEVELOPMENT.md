# Components

## Development

- Install dependencies:

```bash
npm install
```

- Run the unit tests:

```bash
npm test
```

- Build the library:

```bash
npm build
```

This component package Provide the style (in scss), the logic (in mediator function), and the component template documentation in XTS.
XJS and XTS as it is easly understandable is a customised version of JSX/TSX, this need is for express concept commonly used in in many frameworks
and other just in a few of them, using one single syntax.
You can consider XJS/XTS as a virtual language which it doen't refer to any specific front end framework.



```xts
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { ButtonDefaultProps, ButtonProps } from './types';

export function Button(props: ButtonProps) {
  const p = withDefaultProps<ButtonDefaultProps>(props, DEFAULT_PROPS);

  return (
    <button
      ref={p.ref}
      class={p.cls('Button', p.className)}
      @click={p.onClick}
      disabled={p.disabled}
      tabIndex={p.tabIndex}
    >
      <children #each={child}>
        <span>
          <render :content={child} />
        </span>
      </children>
      <div
        #if={p.loadingComponent && p.className.includes('is-loading')}
        :class={p.cls('loading')}
      >
        { p.loadingComponent }
      </div>
    </button>
  );
}
```
