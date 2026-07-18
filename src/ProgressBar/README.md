```tsx
import { useMediator, withDefaultProps } from '@pastweb/x';
import { progressbar } from '@pastweb/components/ProgressBar';
import { DEFAULT_PROPS } from './constants';
import type { ProgressBarProps, ProgressBarDefaultProps, ProgressBarMediator } from './types';

export function ProgressBar(props: ProgressBarProps) {
  const p = withDefaultProps<ProgressBarDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ProgressBarMediator>(progressbar, p);
  const s = m.state;

  if (p.type === 'linear') {
    return (
      <div class={p.cls('ProgressBar', `type-${p.type}`, p.className)}>
        <div class={p.cls('linear')}>
          <div class={p.cls('filler')} style={{ width: s.width }}>
            <div class={p.cls('label')}>{s.labelContent}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class={p.cls('ProgressBar', `type-${p.type}`, p.className)}>
      <div class={p.cls('circular')}>
        <svg class={p.cls('svg')} viewBox={`0 0 ${p.size} ${p.size}`}>
          <circle
            class={p.cls('track')}
            cx={p.size / 2}
            cy={p.size / 2}
            r={s.radius}
            strokeWidth='1em'
          />
          <circle
            class={p.cls('fill')}
            cx={p.size / 2}
            cy={p.size / 2}
            r={s.radius}
            strokeWidth='1em'
            strokeDasharray={s.circumference}
            strokeDashoffset={s.offset}
            transform={`rotate(-90 ${p.size / 2} ${p.size / 2})`}
          />
        </svg>
        {s.labelContent && <div class={p.cls('label')}>{s.labelContent}</div>}
      </div>
    </div>
  );
}
```
