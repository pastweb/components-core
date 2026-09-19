import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../../utils';
import type {
  SplitLayoutItemDefaultProps,
  SplitLayoutItemMediator,
  SplitLayoutItemState,
} from './types';

export function splitLayoutItemMediator(props: SplitLayoutItemDefaultProps): SplitLayoutItemMediator {
  const uid = idCache.getId('splitLayoutItem');
  const getId = () => props.id ? `_${props.id}` : uid;
  const getSeparatorLabel = () => `Resize ${props.ariaLabel || `panel ${props.index + 1}`}`;
  const state = reactive<SplitLayoutItemState>({
    ariaLabel: props.ariaLabel || undefined,
    id: getId(),
    separatorLabel: getSeparatorLabel(),
  });

  effect(
    () => {
      state.ariaLabel = props.ariaLabel || undefined;
      state.id = getId();
      state.separatorLabel = getSeparatorLabel();
    },
    () => [props.ariaLabel, props.id, props.index],
  );

  return {
    state,
    useBeforeUnmount: () => idCache.removeId(uid),
  };
}
