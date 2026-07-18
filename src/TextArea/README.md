## TextArea

### Props
| PropName        | type                                                                 | required | default      | Description                                                   |
|-----------------|----------------------------------------------------------------------|----------|--------------|---------------------------------------------------------------|
| cls             | (...args: ClassValue[]) => string;                                   |    yes   |    -         | function to handle CssModules classes and classes switching   |
| id              | string                                                               |    no    |    -         | unique ID for the textarea element                            |
| tabIndex        | number                                                               |    no    |    0         | tab index for keyboard navigation                             |
| value           | string                                                               |    no    |    -         | initial/controlled value of the textarea                      |
| cols            | number                                                               |    no    |    -         | number of columns for the textarea                            |
| rows            | number                                                               |    no    |    -         | number of rows for the textarea                               |
| name            | string                                                               |    no    |    -         | name attribute for the textarea element                       |
| placeholder     | string                                                               |    no    |    -         | placeholder text for the textarea                             |
| disabled        | boolean                                                              |    no    |  false       | disable the textarea                                          |
| className       | string                                                               |    no    |    ""        | additional classes to be applied to the textarea wrapper      |
| maxLength       | number                                                               |    no    |    -         | maximum character length for the textarea                     |
| onChange        | (value: string) => void                                              |    no    |   noop       | callback fired when the textarea value changes                |
| label           | string                                                               |    no    |    -         | text label for the textarea                                   |
| labelPlacement  | 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' | no | top-start | position of the label relative to the textarea                |
| isLoading       | boolean                                                              |    no    |  false       | show loading state overlay on the textarea                    |
| resizeable      | boolean                                                              |    no    |  false       | allow user resizing of the textarea (sets resize CSS)         |

### Slots
| SlotName | Description | Default Content |
|----------|-------------|-----------------|
| loading  | Custom loading content (shown if `className` includes `'is-loading'` or based on `isLoading`) | "Loading..." |

```tsx
import { withDefaultProps } from '@pastweb/react';
import { DEFAULT_PROPS } from './constants';
import type { TextAreaDefaultProps, TextAreaProps } from './types';

export function TextArea(props: TextAreaProps) {
  const p = withDefaultProps<TextAreaDefaultProps>(props, DEFAULT_PROPS);

  return (
    <div #ref={ref} class={p.cls('TextArea', `label-${p.labelPlacement}`, p.className)}>
      <div class={p.cls('textarea')}>
        <textarea
          #style={{ resize: !p.resizeable ? 'none' : 'both' }}
          id={p.id}
          tabIndex={p.tabIndex}
          value={p.value}
          cols={p.cols}
          rows={p.rows}
          name={p.name}
          disabled={p.disabled}
          placeholder={p.placeholder}
          maxLength={p.maxLength}
          @change={e => p.onChange(e.target.value)}
        />
        <div #if={p.className.includes('is-loading')} class={p.cls('loading')}>
          <slot name='loading'>
            Loading...
          </slot>
        </div>
      </div>
      <span #if={p.label} class={p.cls('label', p.labelPlacement)}>
        {p.label}
      </span>
    </div>
  );
}
```
