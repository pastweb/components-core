## TextInput

### Props
| PropName        | type                                                                 | required | default      | Description                                                   |
|-----------------|----------------------------------------------------------------------|----------|--------------|---------------------------------------------------------------|
| cls             | (...args: ClassValue[]) => string;                                   |    yes   |    -         | function to handle CssModules classes and classes switching   |
| className       | string                                                               |    no    |    ""        | additional classes to be applied to the text input wrapper    |
| autocomplete    | string                                                               |    no    |    -         | autocomplete attribute for the input element                   |
| tabIndex        | number                                                               |    no    |    0         | tab index for keyboard navigation                             |
| type            | 'text' \| 'search' \| 'password' \| 'email' \| 'number'              |    yes   |    -         | type of the input element                                     |
| placeholder     | string                                                               |    no    |    ""        | placeholder text for the input                                |
| disabled        | boolean                                                              |    no    |  false       | disable the input                                             |
| required        | boolean                                                              |    no    |  false       | mark the input as required                                    |
| name            | string                                                               |    no    |    -         | name attribute for the input element                          |
| id              | string                                                               |    no    |    -         | unique ID for the input element (used for label 'for')        |
| max             | number                                                               |    no    |    -         | maximum value for numeric inputs                              |
| min             | number                                                               |    no    |    -         | minimum value for numeric inputs                              |
| value           | string                                                               |    no    |    -         | initial/controlled value of the input                         |
| onChange        | (value: string, e: any) => void                                      |    no    |   noop       | callback fired when the input value changes                   |
| onKeyDown       | (e: any) => void                                                     |    no    |   noop       | callback fired on keydown events in the input                 |
| label           | string                                                               |    no    |    -         | text label for the input                                      |
| labelPlacement  | 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' | no | top-start | position of the label relative to the input                   |

### Slots
| SlotName | Description | Default Content |
|----------|-------------|-----------------|
| left     | Custom content for the left side of the input (e.g., prefix icon), wrapped in `.leftComponent` span | - |
| right    | Custom content for the right side of the input (e.g., suffix button), wrapped in `.rightComponent` span | - |
| loading  | Custom loading content (shown if `className` includes `'is-loading'`) | - |

```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { textInput } from '@pastweb/components/TextInput';
import { DEFAULT_PROPS } from './constants';
import { TextInputProps, TextInputDefaultProps, TextInputMediator } from './types';

export function TextInput(props: TextInputProps) {
  const p = withDefaultProps<TextInputDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TextInputMediator>(textInput, p);

  return (
    <div #ref={p.ref} class={p.cls('TextInput', p.className)}>
      <slot name='left' map={content => <span class={p.cls('leftComponent')}>{content}</span>} />
      <input
        type={p.type}
        tabIndex={p.tabIndex}
        autoComplete={p.autocomplete}
        placeholder={p.placeholder}
        disabled={p.disabled}
        name={p.name}
        id={p.id}
        value={p.value}
        required={p.required}
        max={p.max}
        min={p.min}
        @change={m.onChange}
        @keydown={m.onKeyDown}
      />
      <slot name='right' map={content => <span class={p.cls('rightComponent')}>{content}</span>} />
      <div #if={p.className.includes('is-loading')} class={p.cls('loading')}>
        <slot name='loading' />
      </div>
      <label #if={p.label} class={p.cls('label', p.labelPlacement)} for={p.id}>
        {p.label}
      </label>
    </div>
  );
}
```
