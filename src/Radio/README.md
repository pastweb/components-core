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
      class={p.cls('Radio', { vertical: p.orientation === 'vertical', 'is-disabled': p.disabled }, p.className)}
      role='radiogroup'
      aria-labelledby={p.labelId} // Optional: ID of a visible label for the group
      aria-label={p.label} // Fallback if no visible group label
    >
      {p.options.map((option: RadioOption) => {
        const o = withDefaultProps<RadioDefaultOption>(option, DEFAULT_OPTIONS);
        const inputId = o.id || `radio-${o.value}`; // Ensure unique ID
        
        return (
          <label
            class={p.cls('group', { 'is-disabled': o.disabled })}
            tabindex={o.tabIndex}
          >
            <input
              type='radio'
              id={inputId}
              name={o.name}
              value={o.value}
              checked={s.value === o.value}
              disabled={p.disabled || o.disabled ||undefined}
              @change={(e) => m.onChange(e.target.value)}
              class={p.cls('input')}
            />
            <span class={p.cls('box')}>
              <span class={p.cls('indicator')} />
            </span>
            <span class={p.cls('label')}>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}
```