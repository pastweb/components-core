import { createState, effect } from '@pastweb/tools';
import type { RangeSliderDefaultProps, RangeSliderMediator, RangeSliderState } from './types';

export function rangeSlider(props: RangeSliderDefaultProps): RangeSliderMediator {
  const { state, setState } = createState<RangeSliderState>({
    value: props.value ? `${props.value}` : `${props.max / 2}`,
  });

  effect(props, () => {
    setState({ value: `${props.value}` });
  }, 'value');

  function onChange(e: any) {
    const { value } = e.target;
    setState({ value });
  }

  function onMouseUp() {
    props.onMouseUp(parseFloat(state.value));
  }

  return {
    state,
    onChange,
    onMouseUp,
  };
}
