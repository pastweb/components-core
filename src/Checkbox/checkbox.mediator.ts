import { createState, effect } from '@pastweb/tools';
import type { CheckboxDefaultProps, CheckboxMediator, CheckboxState } from './types';

export function checkbox(props: CheckboxDefaultProps): CheckboxMediator {
  const { state, setState } = createState<CheckboxState>({ value: !!props.value });

  function onChange(value: boolean): void {
    if (props.disabled) return;

    setState({ value });
    props.onChange(value);
  }

  effect(props, ({ value }) => {
    if (value === state.value) return;

    setState({ value: !!value });
  }, 'value');

  return { state, onChange };
}
