## RangeSlider

### Props
| PropName       | type                               | required | default | Description                                                   |
|----------------|------------------------------------|----------|---------|---------------------------------------------------------------|
| cls            | (...args: ClassValue[]) => string; |    yes   |    -    | function to handle CssModules classes and classes switching   |
| id             | string                             |    no    |    -    | unique ID for the input element                               |
| label          | string                             |    no    |    -    | optional label text for the slider                            |
| labelPlacement    | 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' | no | top-start | position of the label relative to the select                  |
| min            | number                             |    yes   |    -    | minimum value of the slider range                             |
| step           | number                             |    no    |    -    | increment step size for the slider (default browser behavior) |
| max            | number                             |    yes   |    -    | maximum value of the slider range                             |
| value          | number                             |    no    |    -    | initial value of the slider                                   |
| className      | string                             |    no    |    ""   | additional classes to be applied to the slider wrapper        |
| onChange       | (e: any) => void                   |    no    |   noop  | callback fired when the slider value changes                  |
| onMouseUp      | (value: number) => void            |    no    |   noop  | callback fired when the mouse button is released on the slider|

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
