import type { TextInputDefaultProps, TextInputMediator } from './types';

export function textInput(props: TextInputDefaultProps): TextInputMediator {
  function onChange(e: any): void {
    if (!props.disabled) {
      props.onChange(e.target.value, e);
    }
  }

  function onKeyDown(e: any): void {
    if (!props.disabled) {
      props.onKeyDown(e);
    }
  }

  return {
    onChange,
    onKeyDown,
  };
}