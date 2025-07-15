```tsx
import { withDefaults } from '@pastweb/x';
import { defaultProps } from './constants';
import { ButtonsProps, ButtonsDefaultProps } from './types';

export function Buttons(props: ButtonsProps) {
  const p = withDefaults<ButtonsDefaultProps>(props, defaultProps);

  return (
    <div class={p.cls('Buttons', p.className)}>
      <children />
    </div>
  );
}
```