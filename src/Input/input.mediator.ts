import { reactive, effect } from '@pastweb/tools';
import { idCache } from '../utils';
import type { InputDefaultProps, InputState, InputMediator } from './types';

export function inputMediator(props: InputDefaultProps): InputMediator {
  let input: HTMLInputElement;
  const uid = idCache.getId();

  const state = reactive<InputState>({
    inputId: props.id ?? `text-input-${uid}`,
    isLoading: props.className.includes('is-loading'),
    disableUpBtn: false,
    disableDownBtn: false,
  });

  effect(
    () => { state.inputId = props.id ?? `text-input-${uid}` },
    () => props.id,
  );

  effect(
    () => { state.isLoading = props.className.includes('is-loading') },
    () => props.className,
  );

  effect(
    updateButtonStates,
    () => props.value,
  );

  function dispatchEvents() {
    const bubbles = true;
    input.dispatchEvent(new Event('input', { bubbles }));
    input.dispatchEvent(new Event('change', { bubbles }));
  }

  function updateButtonStates() {
    if (props.type !== 'number') return;
    const value = parseFloat(props.value as string) || 0;
    const { min, max } = props;

    if (props.min !== undefined) {
      state.disableDownBtn = value === min;
    }

    if (props.max !== undefined) {
      state.disableUpBtn = value === max;
    }
  }

  function onChange(value: string, e: any): void {
    if (!props.disabled) {
      props.onChange(value, e);
    }
  }

  function stepUp(): void {
    input.stepUp();
    dispatchEvents();
  }

  function stepDown(): void {
    input.stepDown();
    dispatchEvents();
  }

  function onKeyDown(e: any): void {
    if (!props.disabled) {
      if (props.type === 'number') {
        switch (e.key) {
          case 'ArrowUp':
            stepUp();
            break;
          case 'ArrowDown':
            stepDown();
            break;
        }
      }
      props.onKeyDown(e);
    }
  }

  function useMounted(inputElement: HTMLInputElement): void {
    input = inputElement;
  }

  const useBeforeUnmount = (): void => idCache.removeId(uid);

  return {
    state,
    onChange,
    onKeyDown,
    stepDown,
    stepUp,
    useMounted,
    useBeforeUnmount,
  };
}
