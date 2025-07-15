import { createState, effect } from '@pastweb/tools';
import type { ToggleDefaultProps, ToggleMediator, ToggleState } from './types';

export function toggle(props: ToggleDefaultProps): ToggleMediator {
  const { state, setState } = createState<ToggleState>({ value: !!props.value });

  function onChange(value: boolean): void {
    if (props.disabled) return;

    setState({ value });
    props.onChange(value);
  }

  effect(props, ({ value }) => {
    if (value === state.value) return;

    setState({ value });
  }, 'value');

  return { state, onChange };
}
