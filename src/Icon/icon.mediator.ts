import { createState, effect } from '@pastweb/tools';
import { initIconState, checkIconSate, replaceIconState } from './util';
import type { IconDefaultProps, IconMediator, IconState } from './types';

export function icon(props: IconDefaultProps): IconMediator {
  const { state, setState } = createState<IconState>(initIconState(props));

  checkIconSate(props, state, setState);

  effect(props, () => replaceIconState(props, setState), 'name');

  return { state };
}
