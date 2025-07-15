```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { checkbox, CheckboxMediator } from '@pastweb/components/Checkbox';
import { DEFAULT_PROPS } from './constants';
import { CheckboxProps, CheckboxDefaultProps } from './types';

export function Checkbox(props: CheckboxProps) {
  const p = withDefaultProps<CheckboxDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<CheckboxMediator>(checkbox, p);
  const s = m.state;

  return (
    <div class={p.cls('Checkbox', `label-${p.labelPosition}`, p.className)}>
      <label class={p.cls('box')} tabIndex={p.tabIndex}>
        <input
          type='checkbox'
          @change={m.onChange}
          disabled={p.disabled || undefined}
          id={p.id}
          name={p.name}
          checked={s.value}
        />
        <span>✔</span>
      </label>
      <label #if={p.label} class={p.labelPosition} for={p.id}>
        { p.label }
      </label>
    </div>
  );
}
```