import type { CollectionData, IconDefaultProps, IconState } from './types';

function isSvg(src: string): boolean {
  return src.trim().startsWith('<');
}

export function initIconState(props: IconDefaultProps): IconState {
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

export async function checkIconSate(props: IconDefaultProps, state: IconState): Promise<void> {
  const { apiUrl } = props;

  const { iconData, collectionName, iconName, src } = state;

  if ((!iconData && !src) && (iconName && collectionName)) {
    const url = `${apiUrl}/${collectionName}.json?icons=${iconName}`;

    try {
      const response = await fetch(url);
      const data = await response.json() as CollectionData;
      if (typeof data === 'number' && (data as number) === 404) {
        throw new Error(`- 404 - Icon: [ ${collectionName}:${iconName} ] not found. URL: ${url}`);
      }

      const { height = 24, width = 24, icons, aliases } = data;
      const { body } = aliases[iconName] ? icons[aliases[iconName].parent] : icons[iconName];

      state.iconName = iconName;
      state.iconData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${body}</svg>`;
      state.collectionName = collectionName;
    } catch (error) {
      console.error(error);
    }
  }
}

export async function replaceIconState(props: IconDefaultProps, state: IconState): Promise<void> {
  const newState: IconState = initIconState(props);

  if (!props.src) await checkIconSate(props, newState);

  state.collectionName = newState.collectionName;
  state.iconData = newState.iconData;
  state.iconName = newState.iconName;
  state.src = newState.src;
}
