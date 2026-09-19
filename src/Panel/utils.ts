import { idCache } from '../utils';
import type {
  PanelDefaultProps,
  PanelHeading,
  PanelState,
} from './types';

/**
 * Resolves the Panel ID from an explicit or generated value.
 *
 * Explicit IDs are stored as `_${id}`. Generated IDs use the `panel` prefix.
 *
 * @example
 * ```ts
 * getPanelId(props, uid);
 * ```
 */
export function getPanelId(
  props: PanelDefaultProps,
  uid: string,
): string {
  return props.id ? `_${props.id}` : uid;
}

/**
 * Resolves the title relationship ID when heading content is present.
 *
 * @example
 * ```ts
 * getTitleId(props, id);
 * ```
 */
export function getTitleId(
  props: PanelDefaultProps,
  id: string,
): string | undefined {
  return props.title ? `title${id}` : undefined;
}

/**
 * Normalizes the optional Panel accessible name.
 *
 * Visible title text names the article, so `ariaLabel` is omitted then. An
 * explicit empty `ariaLabel` also omits the accessible name.
 *
 * @example
 * ```ts
 * getAriaLabel(props, titleId);
 * ```
 */
export function getAriaLabel(
  props: PanelDefaultProps,
  titleId: string | undefined,
): string | undefined {
  if (titleId) return undefined;
  return props.ariaLabel || undefined;
}

/**
 * Resolves the native title heading tag from `headingLevel`.
 *
 * @example
 * ```ts
 * getHeading(props);
 * ```
 */
export function getHeading(
  props: PanelDefaultProps,
): PanelHeading {
  return `h${props.headingLevel}`;
}

/**
 * Synchronizes Panel state from the current props.
 *
 * @example
 * ```ts
 * updateState(props, state, uid);
 * ```
 */
export function updateState(
  props: PanelDefaultProps,
  state: PanelState,
  uid: string,
): void {
  const id = getPanelId(props, uid);
  const titleId = getTitleId(props, id);

  state.id = id;
  state.titleId = titleId;
  state.ariaLabel = getAriaLabel(props, titleId);
  state.heading = getHeading(props);
}

/**
 * Reports Panel close intent.
 *
 * @example
 * ```ts
 * onClose(props);
 * ```
 */
export function onClose(props: PanelDefaultProps): void {
  props.onClose();
}

/** Reports Panel maximize intent. @example onMaximize(props); */
export function onMaximize(props: PanelDefaultProps): void {
  props.onMaximize();
}

/** Reports Panel minimize intent. @example onMinimize(props); */
export function onMinimize(props: PanelDefaultProps): void {
  props.onMinimize();
}

/**
 * Releases the generated Panel ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
