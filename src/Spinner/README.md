## Spinner

### Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| className      | string                             |    no    |    ""   | additional classes to be applied to the spinner               |

### Children
The content to render inside the spinner (e.g., a loading icon or text).

```tsx
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { SpinnerProps, SpinnerDefaultProps } from './types';

export function Spinner(props: SpinnerProps) {
  const p = withDefaultProps<SpinnerDefaultProps>(props, DEFAULT_PROPS);

  return (
    <div class={p.cls('Spinner', p.className)}>
      <children />
    </div>
  );
}
```
