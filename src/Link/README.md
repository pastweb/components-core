## Link

### Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| href           | string                             |    no    |    '#'  | URL to navigate to when clicked                               |
| className      | string                             |    no    |    ""   | additional classes to be applied to the link                  |
| target         | '_self' \| '_blank'                |    no    | '_blank'| target window for the link ('_self' for same tab)             |
| id             | string                             |    no    |    -    | unique ID for the anchor element                              |
| onClick        | (e: any) => void                   |    no    |   noop  | callback fired when the link is clicked                       |

### Children
The content to render inside the link (e.g., text, icons, or other elements).

```tsx
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { LinkProps, LinkDefaultProps } from './types';

export function Link(props: LinkProps) {
  const p = withDefaultProps<LinkDefaultProps>(props, DEFAULT_PROPS);

  return (
    <a
      #ref={p.ref}
      class={p.cls('Link', p.className)}
      href={href}
      target={target}
      id={id}
      @click={p.onClick}
    >
      <children />
    </a>
  );
}
```
