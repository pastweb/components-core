```tsx
import { kebabize } from '@pastweb/tools';
import { withDefaultProps, useMediator, useMounted, useBeforeUnmount, renderContent } from '@pastweb/x';
import { select } from '@pastweb/components/Select';
import { DEFAULT_PROPS } from './constants';
import { SelectProps, SelectMediator, SelectDefaultProps } from './types';

export function Select(props: SelectProps) {
  const p = withDefaultProps<SelectDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SelectMediator>(select, p);
  const s = m.state;
  const inputId = p.id ? p.id : p.name ? `select-${p.name}` : p.label ? `select-${kebabize(p.label)}` : 'select';
  const labelElement = useRef<HTMLLabelElement>(null);
  const listElement = useRef<HTMLUListElement>(null);

  useMounted(() => {
    if (!labelElement.value || !listElement.value) return;
    m.onMounted(labelElement.value, listElement.value);
  });

  useBeforeUnmount(() => m.onUnmounted());

  return (
    <div
      #ref={ref}
      id={inputId}
      class={p.cls('Select', `label-${p.labelPosition}`, p.className)}
      role='combobox'
      aria-haspopup='listbox'
      aria-expanded={s.isOpen}
      aria-owns={`${p.id}-options`}
      aria-labelledby={`${p.id}-label`}
      aria-controls={`${p.id}-options`}
      tabindex={p.tabIndex}
      @keydown={m.onKeyDown}
    >
      <label
        #ref={labelElement}
        id={`${inputId}-label`}
        class={p.cls('select')}
        for={`${inputId}-button`}
        tabindex={p.tabIndex + 1}
      >
        <span #if={p.leftComponent} class={p.cls('leftcomponent')}>
          {renderContent(p.leftComponent)}
        </span>
        <span
          id={`${inputId}-button`}
          role='button'
          aria-haspopup='listbox'
          aria-expanded={s.isOpen}
          class={p.cls('current')}
          @click={m.onClick}
        >
          {p.options.find((o) => o.value === s.value)?.label || <span class={p.cls('placeholder')}>{p.placeholder}</span>}
          <span class={p.cls('arrow')}>➤</span>
        </span>
        <span #if={p.rightComponent} class={p.cls('rightComponent')}>
          {renderContent(p.rightComponent)}
        </span>
        <div #if={p.isLoading} class={p.cls('loader')}>
          {p.loadingComponent ? renderContent(p.loadingComponent) : 'Loading...'}
        </div>
        <ul
          #ref={listElement}
          id={`${inputId}-options`}
          role='listbox'
          class={p.cls('options', { show: s.isOpen })}
          aria-labelledby={`${p.id}-label`}
          tabindex={p.tabIndex + 2}
        >
          {p.options.map((o, i) => {
            const { value, label, disabled, component } = o;
            const { highlightIndex } = s;
            return (
              <li
                key={`${kebabize(label)}-${i}`}
                role='option'
                aria-selected={value === s.value}
                aria-disabled={disabled || undefined}
                class={p.cls('option', { selected: value === s.value, highlight: i === highlightIndex, disabled })}
                tabindex={- (p.tabIndex + 1)}
                @click={() => !disabled && m.onChange(value)}
                @keydown={(e) => m.onOptionKeyDown(e, value)}
              >
                {label || component && renderContent(component, o)}
              </li>
            );
          })}
        </ul>
      </label>
      <span #if={p.label} id={`${inputId}-label`} class={p.cls('label', p.labelPosition)}>
        {p.label}
      </span>
    </div>
  );
}
```
