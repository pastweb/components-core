## Radio

### Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| className      | string                             |    no    |    ""   | additional classes to be applied to the radio group           |
| orientation    | 'horizontal' \| 'vertical' \| string | no    | horizontal | layout orientation for the radio options ('vertical' stacks vertically) |
| disabled       | boolean                            |    no    |  false  | disable all radio options                                     |
| value          | string                             |    no    |    ""   | initial selected value                                        |
| options        | RadioOption[]                      |    yes   |    -    | array of radio options to render                              |
| onChange       | (value: string) => void            |    no    |   noop  | callback fired when a radio option is selected                |
| label          | string                             |    no    |    -    | optional label text for the radio group (used for aria-label) |
| labelId        | string                             |    no    |    -    | ID of an external label for the radio group (used for aria-labelledby) |
| labelPlacement    | 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' | no | top-start | position of the label relative to the select                  |

### RadioOption
| PropName   | type    | required | default | Description                                                   |
|------------|---------|----------|---------|---------------------------------------------------------------|
| label      | string  |    yes   |    -    | display text for the radio option                             |
| value      | any     |    yes   |    -    | value associated with the radio option                        |
| name       | string  |    no    |    -    | name attribute for the input element                          |
| id         | string  |    no    |    -    | unique ID for the input element (auto-generated if omitted)   |
| tabIndex   | number  |    no    |    0    | tab index for the option label                                |
| disabled   | boolean |    no    |  false  | disable this specific radio option                            |

```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { radio } from '@pastweb/components/Radio';
import { DEFAULT_PROPS, DEFAULT_OPTIONS } from './constants';
import { RadioProps, RadioDefaultProps, RadioOption, RadioDefaultOption, RadioMediator } from './types';

export function Radio(props: RadioProps) {
  const p = withDefaultProps<RadioDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<RadioMediator>(radio, p);
  const s = m.state;

  return (
    <div
      #ref={ref}
      id={p.id}
      class={p.cls('Radio', `label-${p.labelPlacement}`, { 'is-disabled': p.disabled }, p.className)}
      role='radiogroup'
      aria-labelledby={p.labelId} // Optional: ID of a visible label for the group
      aria-label={p.label} // Fallback if no visible group label
    >
      <div class={p.cls('buttons', { vertical: p.orientation === 'vertical' })} >
        {p.options.map((option: RadioOption) => {
          const o = withDefaultProps<RadioDefaultOption>(option, DEFAULT_OPTIONS);
          const inputId = o.id || `radio-${o.value}`; // Ensure unique ID

          return (
            <label
              key={o.label}
              class={p.cls('group', { 'is-disabled': o.disabled })}
              tabIndex={o.tabIndex}
            >
              <input
                type='radio'
                id={inputId}
                name={o.name}
                value={o.value}
                checked={s.value === o.value}
                disabled={p.disabled || o.disabled || undefined}
                class={p.cls('input')}
                @change={e => m.onChange(e.target.value, e)}

              />
              <span class={p.cls('box')}>
                <span class={p.cls('indicator')} />
              </span>
              <span class={p.cls('buttonLabel')}>{o.label}</span>
            </label>
          );
        })}
      </div>
      <label #if={p.label} class={p.cls('label', p.labelPlacement)} for={p.id}>
        {p.label}
      </label>
    </div>
  );
}
```
