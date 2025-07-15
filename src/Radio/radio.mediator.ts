import { createState, effect } from '@pastweb/tools';
import type { RadioDefaultProps, RadioState, RadioMediator } from './types';

export function radio(props: RadioDefaultProps): RadioMediator {
  const { state, setState } = createState<RadioState>({ value: props.value });

  function onChange(value: string = ''): void {
    if (props.disabled) return;

    setState({ value });
    props.onChange(value);
  }

  effect(props, ({ value = '' }) => {
    if (value === state.value) return;

    setState({ value });
  }, 'value');

  return { state, onChange };
}
