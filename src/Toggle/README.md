## Toggle

### Props
| PropName        | type                                                                 | required | default      | Description                                                   |
|-----------------|----------------------------------------------------------------------|----------|--------------|---------------------------------------------------------------|
| cls             | (...args: ClassValue[]) => string;                                   |    yes   |    -         | function to handle CssModules classes and classes switching   |
| className       | string                                                               |    no    |    ""        | additional classes to be applied to the toggle wrapper        |
| disabled        | boolean                                                              |    no    |  false       | disable the toggle                                            |
| id              | string \| number                                                     |    no    |    -         | unique ID for the input element (auto-generated if omitted)   |
| tabIndex        | number                                                               |    no    |    0         | tab index for keyboard navigation                             |
| name            | string                                                               |    no    |    -         | name attribute for the input element                          |
| label           | string                                                               |    no    |    -         | text label for the toggle                                     |
| labelPlacement  | 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' | no | top-start | position of the label relative to the toggle                  |
| onChange        | (checked: boolean, e: any) => void                                   |    no    |   noop       | callback fired when the toggle state changes                  |
| value           | boolean                                                              |    no    |  false       | initial/controlled checked state of the toggle                |

```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { toggle, ToggleProps, ToggleDefaultProps, DEFAULT_PROPS, ToggleMediator } from '@pastweb/components/Toggle';

export function Toggle(props: ToggleProps) {
  const p = withDefaultProps<ToggleDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ToggleMediator>(toggle, p);
  const s = m.state;

  const inputId = `${p.id}` || `toggle-${p.name || 'checkbox'}`; // Ensure unique ID

  return (
    <div
      class={p.cls('Toggle', `label-${p.labelPlacement}`, p.className)}
      role='presentation' // Optional: indicates this is a container, not an interactive element
    >
      <label
        class={p.cls('button')}
        tabindex={p.tabIndex}
      >
        <input
          #ref={ref}
          type='checkbox'
          id={inputId}
          name={p.name}
          checked={s.value}
          disabled={p.disabled}
          @change={(e) => m.onChange(e.target.checked, e)}
          class={p.cls('input')}
          aria-label={p.label && !p.id ? p.label : undefined} // Fallback if no visible label
        />
      </label>
      <label #if={p.label} class={p.cls('label', p.labelPlacement)} for={inputId}>
        {p.label}
      </label>
    </div>
  );
}
```
