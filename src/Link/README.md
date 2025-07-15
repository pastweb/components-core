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