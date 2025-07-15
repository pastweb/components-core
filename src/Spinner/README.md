```jsx
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