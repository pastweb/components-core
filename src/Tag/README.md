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