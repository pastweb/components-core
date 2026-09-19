import type { SplitLayoutDefaultProps, SplitLayoutKeyEvent, SplitLayoutSeparatorValue, SplitLayoutState } from '../types';
import { normalizeSizes } from './normalizeSizes';
import { resizePair } from './resizePair';

/** Updates pane count and recalculates its normalized sizes. */
export function setItemCount(props: SplitLayoutDefaultProps, state: SplitLayoutState, count: number): void {
  const nextCount = Math.max(0, Math.floor(count));
  if (nextCount === state.itemCount && state.sizes.length === nextCount) return;
  state.itemCount = nextCount;
  state.sizes = normalizeSizes(props.sizes, nextCount, props.minSize);
}

/** Applies a separator movement and reports the new pane sizes. */
export function applyResize(props: SplitLayoutDefaultProps, state: SplitLayoutState, index: number, delta: number): void {
  if (props.disabled) return;
  const next = resizePair(state.sizes, index, delta, props.minSize);
  if (next === state.sizes) return;
  state.sizes = next;
  props.onSizesChange([...next]);
}

/** Resizes the separator currently being dragged. */
export function onResize(props: SplitLayoutDefaultProps, state: SplitLayoutState, delta: number): void {
  if (state.activeSeparator === null || !Number.isFinite(delta)) return;
  applyResize(props, state, state.activeSeparator, delta);
}

/** Handles keyboard resizing for a separator. */
export function onSeparatorKeyDown(props: SplitLayoutDefaultProps, state: SplitLayoutState, event: SplitLayoutKeyEvent, index: number): void {
  if (props.disabled) return;
  const negative = props.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
  const positive = props.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
  let delta: number | undefined;
  if (event.key === negative) delta = -props.keyboardStep;
  if (event.key === positive) delta = props.keyboardStep;
  if (event.key === 'Home') delta = props.minSize - (state.sizes[index] ?? 0);
  if (event.key === 'End') delta = (state.sizes[index + 1] ?? 0) - props.minSize;
  if (delta === undefined) return;
  event.preventDefault?.();
  applyResize(props, state, index, delta);
}

/** Returns ARIA range values for a separator. */
export function getSeparatorValue(props: SplitLayoutDefaultProps, state: SplitLayoutState, index: number): SplitLayoutSeparatorValue {
  const pairTotal = (state.sizes[index] ?? 0) + (state.sizes[index + 1] ?? 0);
  return {
    min: props.minSize,
    max: Math.max(props.minSize, pairTotal - props.minSize),
    now: state.sizes[index] ?? 0,
  };
}

/** Clears the active drag separator. */
export function endResize(state: SplitLayoutState): void {
  state.activeSeparator = null;
}

/** Starts a separator drag when interaction is enabled. */
export function startResize(props: SplitLayoutDefaultProps, state: SplitLayoutState, index: number): void {
  if (!props.disabled) state.activeSeparator = index;
}
