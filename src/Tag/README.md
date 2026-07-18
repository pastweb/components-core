## Tag

### Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| className      | string                             |    no    |    ""   | additional classes to be applied to the tag                   |

### Children
The content to render inside the tag.

```tsx
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { TagProps, TagDefaultProps } from './types';

export function Tag(props: TagProps) {
  const p = withDefaultProps<TagDefaultProps>(props, DEFAULT_PROPS);

  return (
    <div class={p.cls('Tag', p.className)}>
      <children />
    </div>
  );
}
```
