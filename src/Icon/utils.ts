import type {
  CollectionData,
  IconDefaultProps,
  IconResolvedSource,
  IconState,
} from './types';

function isSvg(src: string): boolean {
  return src.trim().startsWith('<');
}

/**
 * Normalizes the optional Icon accessible name.
 *
 * An explicit empty `ariaLabel` keeps the icon decorative.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: IconDefaultProps,
): string | undefined {
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the Icon image role from the accessible name.
 *
 * @example
 * ```ts
 * getRole(props);
 * ```
 */
export function getRole(
  props: IconDefaultProps,
): 'img' | undefined {
  return getAriaLabel(props) ? 'img' : undefined;
}

/**
 * Normalizes decorative hiding when the Icon has no accessible name.
 *
 * @example
 * ```ts
 * getAriaHidden(props);
 * ```
 */
export function getAriaHidden(
  props: IconDefaultProps,
): true | undefined {
  return getAriaLabel(props) ? undefined : true;
}

/**
 * Resolves the synchronous icon state from direct and collection sources.
 *
 * @example
 * ```ts
 * const state = initIconState({ ...props, src: '/icons/add.svg' });
 * ```
 */
export function initIconState(props: IconDefaultProps): IconResolvedSource {
  const { name, collection } = props;
  const [collectionName, iconName] = name.split(':');
  const collectionData = collection[collectionName] || {};
  const iconData = collectionData[iconName] && isSvg(collectionData[iconName]) ? collectionData[iconName] : isSvg(props.src) ? props.src : '';
  const src = collectionData[iconName] && !isSvg(collectionData[iconName]) ? collectionData[iconName] : !isSvg(props.src) ? props.src : '';

  return {
    collectionName,
    iconName,
    iconData,
    src,
  };
}

/**
 * Loads a missing named icon from an Iconify-compatible endpoint.
 *
 * @example
 * ```ts
 * await checkIconState(props, state);
 * ```
 */
export async function checkIconState(props: IconDefaultProps, state: IconResolvedSource): Promise<void> {
  const { apiUrl } = props;

  const { iconData, collectionName, iconName, src } = state;

  if ((!iconData && !src) && (iconName && collectionName)) {
    const url = `${apiUrl}/${collectionName}.json?icons=${iconName}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Icon request failed with status ${response.status}: ${url}`);
      const data = await response.json() as CollectionData;

      const { height = 24, width = 24, icons, aliases } = data;
      const resolvedName = aliases?.[iconName]?.parent || iconName;
      const icon = icons?.[resolvedName];
      if (!icon) throw new Error(`Icon not found: ${collectionName}:${iconName}`);

      state.iconName = iconName;
      state.iconData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${icon.body}</svg>`;
      state.collectionName = collectionName;
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * Replaces all icon state after a source prop changes.
 *
 * @example
 * ```ts
 * await replaceIconState(nextProps, state);
 * ```
 */
export async function replaceIconState(props: IconDefaultProps, state: IconState): Promise<void> {
  const newState: IconResolvedSource = initIconState(props);

  if (!props.src) await checkIconState(props, newState);

  state.collectionName = newState.collectionName;
  state.iconData = newState.iconData;
  state.iconName = newState.iconName;
  state.src = newState.src;
}
