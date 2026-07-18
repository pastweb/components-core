import { reactive, effect } from '@pastweb/tools';
import { idCache } from '../utils';
import type { TextAreaDefaultProps, TextAreaMediator } from './types';

export function textAreaMediator(props: TextAreaDefaultProps): TextAreaMediator {
  const uid = idCache.getId();

  const state = reactive({
    inputId: props.id ?? `textarea-${uid}`,
    isLoading: props.className.includes('is-loading'),
  });

  effect(
    () => state.inputId = props.id ?? `textarea-${uid}`,
    () => props.id,
  );

  effect(
    () => state.isLoading = props.className.includes('is-loading'),
    () => props.className,
  );

  const onUnmount = () => idCache.removeId(uid);

  return { state, onUnmount };
}
