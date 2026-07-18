import { reactive, computed, effect } from '@pastweb/tools';
import { idCache } from '../utils';
import type { PanelDefaultProps, PanelMediator } from './types';

export function panelMediator(props: PanelDefaultProps): PanelMediator {
  const uid = idCache.getId();

  const state = reactive({
    uid,
    titleId: undefined as string | undefined,
  });

  const titleId = computed<string | undefined>(() => props.title ? `panel-title-${uid}` : undefined);

  effect(() => { state.titleId = titleId.value; });

  const onUnmount = () => idCache.removeId(uid);

  return { state, onUnmount };
}
