```tsx
import { withDefaultProps, useMediator } from '@pastweb/x';
import { DEFAULT_PROPS } from './constants';
import { rangeSlider } from '@pastweb/components/RangeSlider';
import { RangeSliderProps, RangeSliderDefaultProps, RangeSliderMediator } from './types';

export function RangeSlider(props: RangeSliderProps) {
  const p = withDefaultProps<RangeSliderDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<RangeSliderMediator>(rangeSlider, p);
  const s = m.state;

  return (
    <div class={p.cls('RangeSlider', p.className)}>
      <input
        class={p.cls('slider')}
        type='range'
        id={p.id}
        min={p.min}
        max={p.max}
        step={p.step}
        value={s.value}
        @change={m.onChange}
        @mouseup={m.onMouseUp}
      />
    </div>
  );
}
```