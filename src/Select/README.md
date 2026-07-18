## Select

### Props
| PropName          | type                                                                 | required | default      | Description                                                   |
|-------------------|----------------------------------------------------------------------|----------|--------------|---------------------------------------------------------------|
| cls               | (...args: ClassValue[]) => string;                                   |    yes   |    -         | function to handle CssModules classes and classes switching   |
| options           | SelectOption[]                                                       |    yes   |    -         | array of selectable options                                   |
| disabled          | boolean                                                              |    no    |  false       | disable the select component                                  |
| className         | string                                                               |    no    |    ""        | additional classes to be applied to the select                |
| id                | string                                                               |    no    |    -         | unique ID for the input element                               |
| name              | string                                                               |    no    |    -         | name attribute for the input element                          |
| placeholder       | string                                                               |    no    | Select       | placeholder text displayed when no value is selected          |
| tabIndex          | number                                                               |    no    |    0         | tab index for keyboard navigation                             |
| label             | string                                                               |    no    |    -         | text label for the select                                     |
| labelPlacement    | AlignedPlacement                                                     |    no    | top-start    | position of the label relative to the select                  |
| onChange          | (value: any) => void                                                 |    no    |   noop       | callback fired when the selection changes                     |
| value             | any                                                                  |    no    |    -         | initial/controlled selected value                             |
| offset            | number                                                               |    no    |    3         | offset distance for the dropdown positioning                  |
| closeOnSelect     | boolean                                                              |    no    |  true        | close the dropdown after an option is selected                |

### SelectOption
| PropName  | type    | required | default | Description                                                   |
|-----------|---------|----------|---------|---------------------------------------------------------------|
| value     | any     |    yes   |    -    | value associated with the option                              |
| label     | string  |    yes   |    -    | display text for the option                                   |
| disabled  | boolean |    no    |  false  | disable this specific option                                  |

### Slots
| SlotName | Description | Default Content |
|----------|-------------|-----------------|
| left     | Custom content for the left side of the input (e.g., prefix icon), wrapped in `.leftComponent` span | - |
| right    | Custom content for the right side of the input (e.g., suffix button), wrapped in `.rightComponent` span | - |
| loading  | Custom loading content (shown if `className` includes `'is-loading'`) | - |

```tsx
// Select
import { setContext, withDefaultProps, useMediator, useMounted, useRef, useBeforeUnmount } from '@pastweb/x';
import { select } from '@pastweb/components/Select';
import { DEFAULT_PROPS, SELECT_CONTEXT_KEY } from './constants';
import { SelectProps, SelectMediator, SelectDefaultProps, SelectContext } from './types';

export function Select(props: SelectProps) {
  const p = withDefaultProps<SelectDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SelectMediator>(select, p);
  const s = m.state;
  
  const targetElement = useRef<HTMLLabelElement>();
  const listElement = useRef<HTMLUListElement>();

  setContext<SelectContext>(SELECT_CONTEXT_KEY, m);

  useMounted(() => {
    if (!targetElement.value || !listElement.value) return;
    m.onMounted(labelElement.value, listElement.value);
  });

  useBeforeUnmount(() => m.onUnmounted());

  return (
    <div
      #ref={ref}
      id={s.inputId}
      class={p.cls('Select', `label-${p.labelPlacement}`, p.className)}
      role='combobox'
      aria-haspopup='listbox'
      aria-expanded={s.isOpen}
      aria-owns={`${p.id}-options`}
      aria-labelledby={`${p.id}-label`}
      aria-controls={`${p.id}-options`}
      tabindex={p.tabIndex}
    >
      <label
        #ref={targetElement}
        id={`${s.inputId}-label`}
        class={p.cls('select')}
        for={`${s.inputId}-button`}
        tabindex={p.tabIndex + 1}
      >
        <slot map={content => <span class={p.cls('leftcomponent')}>{content}<span>} />
        <span
          id={`${s.inputId}-button`}
          role='button'
          aria-haspopup='listbox'
          aria-expanded={s.isOpen}
          class={p.cls('current')}
          @keydown={m.onKeyDown}
          @click={m.onClick}
        >
          <render content={p.options.find((o) => o.value === s.value)?.label || <span className={p.cls('placeholder')}>{p.placeholder}</span>} />
          <span class={p.cls('arrow')}>➤</span>
        </span>
        <slot map={content => <span class={p.cls('rightComponent')}>{content}</span>} />
        <slot #if={p.className.includes('is-loading')} map={content => <div class={p.cls('loader')}>{content}</div>}>
          Loading...
        </slot>
        <ul
          #ref={listElement}
          id={`${s.inputId}-options`}
          role='listbox'
          class={p.cls('options', { show: s.isOpen })}
          aria-labelledby={`${p.id}-label`}
          tabindex={p.tabIndex + 2}
        >
          <children />
        </ul>
      </label>
      <span #if={p.label} id={`${s.inputId}-label`} class={p.cls('label', p.labelPlacement)}>
        {p.label}
      </span>
    </div>
  );
}
```


```tsx
// SelectItem
import { getContext, withDefaultProps } from '@pastweb/x';
import { DEFAULT_SELECT_ITEM_PROPS, SELECT_CONTEXT_KEY } from './constants';
import type { SelectItemProps, SelectItemDefaultProps, SelectContext } from './types';

const props = defineProps<SelectItemProps>();
const p = withDefaultProps<SelectItemDefaultProps>(props, DEFAULT_SELECT_ITEM_PROPS);
const c = getContext<SelectContext>(SELECT_CONTEXT_KEY);
const s = c.state;
const i = c.registerItem();

return (
  <li
    role='option'
    aria-selected={o.value === s.value}
    aria-disabled={o.disabled}
    class={p.cls('option', { selected: o.value === s.value, highlight: i === s.highlightIndex, disabled: o.disabled })}
    tabindex={- (p.tabIndex + 1)}
    @click={() => !p.disabled && c.onChange(o.value)}
    @keydown={(e) => c.onOptionKeyDown(e, o.value)}
  >
    <render content={o.label} />
  </li>
);
```
