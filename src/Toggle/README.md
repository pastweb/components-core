## Props

## Notes
- the `ref` attribute is intended to be the HTMLElement reference to be forwarded using the props Object.

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
      class={p.cls('Toggle', `label-${p.labelPosition}`, p.className)}
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
          @change={(e) => m.onChange(e.target.checked)}
          class={p.cls('input')}
          aria-label={p.label && !p.id ? p.label : undefined} // Fallback if no visible label
        />
      </label>
      <label #if={p.label} class={p.cls('label', p.labelPosition)} for={inputId}>
        {p.label}
      </label>
    </div>
  );
}
```
