import { MODE } from '../../constants';
import type { WindowControllerDefaultProps } from '../../types';

export function bringToFront(props: WindowControllerDefaultProps, mountElement: HTMLElement) {
  const { mode, portalElement } = props;

  if (mode === MODE.floating) {
    const portals = Array.from(portalElement.children);
    const element = mountElement;

    if (portals.map(el => el.id).indexOf(element.id) !== portals.length - 1) {
      portalElement.appendChild(element);
    }
  }
}
