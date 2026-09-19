import { MODE } from '../../constants';
import type { WindowControllerDefaultProps, WindowControllerVars } from '../../types';

export function bringToFront(props: WindowControllerDefaultProps, vars: WindowControllerVars, activate = true): void {
  const { entryId, manager, mode, portalElement } = props;
  const { mountElement } = vars;

  if (mode === MODE.floating && mountElement) {
    if (activate) manager?.activate(entryId);
    const portals = [...portalElement.children];
    const element = mountElement;

    if (portals.map(el => el.id).indexOf(element.id) !== portals.length - 1) {
      portalElement.append(element);
    }
  }
}
