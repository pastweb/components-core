## Stepper

### Step
| PropName     | type                               | required | default | Description                                                   |
|--------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| className    | string                             |    no    |    ""   | additional classes to be applied to the step                  |
| label        | string                             |    no    |    ""   | label text displayed for the step                             |
| description  | string                             |    no    |    ""   | description text displayed below the label                    |
| 'aria-label' | string                             |    no    |    -    | accessibility label for the step                              |
| onClick      | () => void                         |    no    |   noop  | callback fired when the step is clicked                       |
| content      | any                                |    no    |    -    | custom content for the step indicator (falls back to step number if omitted) |

### Props
| PropName       | type                               | required | default      | Description                                                   |
|----------------|------------------------------------|----------|--------------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -         | function to handle CssModules classes and classes switching   |
| steps          | Step[]                             |    yes   |    -         | array of steps to render in the stepper                       |
| active         | number                             |    no    |    1         | index of the currently active step (1-based)                  |
| className      | string                             |    no    |    ""        | additional classes to be applied to the stepper               |
| orientation    | 'horizontal' \| 'vertical'         |    no    | horizontal   | layout orientation for the steps                              |
| labelPosition  | 'top' \| 'bottom' \| 'left' \| 'right' | no     | bottom       | position of the labels relative to the steps                  |

```tsx
import { withDefaultProps } from '@pastweb/x';
import { DEFAULT_PROPS, DEFAULT_STEP_PROPS } from './constants';
import type { StepDefaultProps, StepperDefaultProps, StepperProps } from './types';

export function Stepper(props: StepperProps) {
  const p = withDefaultProps<StepperDefaultProps>(props, DEFAULT_PROPS);

  return (
    <div #ref={ref} class={p.cls('Stepper', {
      ['is-horizontal']: p.orientation === 'horizontal',
      ['is-vertical']: p.orientation === 'vertical',
      ['is-reverse']: (p.orientation === 'horizontal' && p.labelPosition === 'top') || (p.orientation === 'vertical' && p.labelPosition === 'left'),
    }, p.className)}>
      <div class={p.cls('steps')}>
        {p.steps.map((step, i) => {
          const s = withDefaultProps<StepDefaultProps>(step, DEFAULT_STEP_PROPS);

          return (
            <div
              #key={`${s.label || ''}_${i}`}
              class={p.cls('step', s.className, {
                'is-active': p.active - 1 === i,
                'is-done': p.active > i && p.active - 1 !== i,
              })}
            >
              {i > 0 && i < p.steps.length && <div class={p.cls('line')}></div>}
              <div
                class={p.cls('content')}
                @click={s.onClick}
                aria-label={s['aria-label']}
              >
                {s.content ? <Render content={s.content} /> : i + 1}
              </div>
              {i < p.steps.length - 1 && <div class={p.cls('line')}></div>}
            </div>
          );
        })}
      </div>
      <div class={p.cls('labels')}>
        {p.steps.map(({ label, description }, i) => {
          if (!label && !description) return null;
          return (
            <div #key={`${label || ''}_${i}`} class={p.cls('label')}>
              {label && <label>{label}</label>}
              {description && <small>{description}</small>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```
