import { effect, reactive } from '@pastweb/tools';
import {
  endResize,
  getSeparatorValue,
  normalizeSizes,
  onResize,
  onSeparatorKeyDown,
  setItemCount,
  startResize,
} from './utils';
import type {
  SplitLayoutContext,
  SplitLayoutDefaultProps,
  SplitLayoutMediator,
  SplitLayoutState,
} from './types';

export function splitLayoutMediator(props: SplitLayoutDefaultProps): SplitLayoutMediator {
  const state = reactive<SplitLayoutState>({
    activeSeparator: null,
    ariaLabel: props.ariaLabel || undefined,
    isDisabled: props.disabled || undefined,
    itemCount: 0,
    sizes: [],
  });

  function getContext(): SplitLayoutContext {
    return {
      cls: props.cls,
      get disabled() { return props.disabled; },
      get itemCount() { return state.itemCount; },
      get minSize() { return props.minSize; },
      get orientation() { return props.orientation; },
      getSize: index => state.sizes[index] ?? 0,
      getSeparatorValue: index => getSeparatorValue(props, state, index),
      onResize: delta => onResize(props, state, delta),
      onResizeEnd: () => endResize(state),
      onResizeStart: index => startResize(props, state, index),
      onSeparatorKeyDown: (event, index) => onSeparatorKeyDown(props, state, event, index),
    };
  }

  effect(() => {
    state.sizes = normalizeSizes(props.sizes, state.itemCount, props.minSize);
  }, [() => props.sizes, () => props.minSize]);

  effect(
    () => {
      state.ariaLabel = props.ariaLabel || undefined;
      state.isDisabled = props.disabled || undefined;
    },
    () => [props.ariaLabel, props.disabled],
  );

  const context = getContext();
  return {
    state,
    ...context,
    getContext,
    setItemCount: count => setItemCount(props, state, count),
    useBeforeUnmount: context.onResizeEnd,
  };
}
