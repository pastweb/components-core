import type { SheetControllerDefaultProps } from '../../types';

export function onMounted(params: {
  props: SheetControllerDefaultProps;
  SheetElement: HTMLElement;
  onClosePortal: (e: any) => void;
}): void {
  const { props, SheetElement, onClosePortal } = params;
  const { portalElement, animationTime } = props;
  portalElement.addEventListener('close', onClosePortal);
  setTimeout(() => { SheetElement.focus(); }, animationTime);
}
