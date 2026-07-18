## Checkbox

### Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| checkChar      | string                             |    no    |    ✔    | character/symbol to display when checked                      |
| className      | string                             |    no    |    ""   | additional classes to be applied to the checkbox              |
| id             | string                             |    no    |    -    | unique ID for the input element                               |
| disabled       | boolean                            |    no    |  false  | disable the checkbox                                          |
| label          | string                             |    no    |    -    | text label for the checkbox (positioned based on labelPosition)|
| labelPlacement    | 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' | no | top-start | position of the label relative to the select                  |
| name           | string                             |    no    |    -    | name attribute for the input element                          |
| value          | boolean                            |    no    |  false  | initial checked state of the checkbox                         |
| tabIndex       | number                             |    no    |    0    | tab index for keyboard navigation                             |
| onChange       | (checked: boolean) => void         |    no    |   noop  | callback fired when the checkbox state changes                |

### Slots
| SlotName | Description | Default Content | Props |
|----------|-------------|-----------------|-------|
| (default)| Custom content for the checkbox mark (replaces the check character) | `<span>{checkChar}</span>` | `{ checkChar: string }` |

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
    <div class={p.cls('Checkbox', `label-${p.labelPlacement}`, p.className)}>
      <label class={p.cls('box')} tabIndex={p.tabIndex}>
        <input
          type='checkbox'
          @change={m.onChange}
          disabled={p.disabled || undefined}
          id={p.id}
          name={p.name}
          checked={s.value}
        />
        <slot props={{ checkChar: p.checkChar}}>
          <span>{p.checkChar}</span>
        </slot>
      </label>
      <label #if={p.label} class={p.cls('label', p.labelPlacement}) for={p.id}>
        { p.label }
      </label>
    </div>
  );
}
```
