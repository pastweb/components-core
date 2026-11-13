import { effect, getContextUtils, reactive } from '@pastweb/tools';
import { idCache } from '../../utils';
import { SPLIT_LAYOUT_CONTEXT_KEY } from '../constants';
import { onPointerDown, onPointerMove, onPointerUp } from './utils';
import type { SplitLayoutContext } from '../types';
import type {
  SplitLayoutItemDefaultProps,
  SplitLayoutItemMediator,
  SplitLayoutItemMediatorVars,
  SplitLayoutItemState,
  SplitLayoutPointerEvent,
  SplitLayoutPointerInput,
  SplitLayoutPointerTarget,
} from './types';

export function splitLayoutItemMediator(props: SplitLayoutItemDefaultProps): SplitLayoutItemMediator {
  const { getContext } = getContextUtils();
  const context = getContext<SplitLayoutContext>(SPLIT_LAYOUT_CONTEXT_KEY)!;
  const uid = idCache.getId('splitLayoutItem');
  const getId = () => props.id ? `_${props.id}` : uid;
  const getSeparatorLabel = () => `Resize ${props.ariaLabel || `panel ${props.index + 1}`}`;
  const vars: SplitLayoutItemMediatorVars = {
    lastPosition: null,
  };
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

  function toPointerEvent(event: SplitLayoutPointerInput): SplitLayoutPointerEvent {
    return {
      clientX: event.clientX,
      clientY: event.clientY,
      currentTarget: event.currentTarget as SplitLayoutPointerTarget,
      pointerId: event.pointerId,
      preventDefault: () => event.preventDefault?.(),
    };
  }

  return {
    onPointerDown: event => onPointerDown(props, context, vars, toPointerEvent(event)),
    onPointerMove: event => onPointerMove(context, vars, toPointerEvent(event)),
    onPointerUp: event => onPointerUp(context, vars, toPointerEvent(event)),
    state,
    useBeforeUnmount: () => {
      vars.lastPosition = null;
      context.onResizeEnd();
      idCache.removeId(uid);
    },
  };
}
