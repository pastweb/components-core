import { reactive, effect } from '@pastweb/tools';
import { initIconState, checkIconSate, replaceIconState } from './util';
import { IconDefaultProps, IconMediator, IconState } from './types';

export function iconMediator(props: IconDefaultProps): IconMediator {
  const state = reactive<IconState>(initIconState(props));

  checkIconSate(props, state);

  effect(
    () => replaceIconState(props, state),
    () => props.name,
  );

  return { state };
}
