import type { SlideControllerDefaultProps } from '../../types';

export function onMounted(params: {
  props: SlideControllerDefaultProps;
  slideElement: HTMLElement;
  onClosePortal: (e: any) => void;
}): void {
  const { props, slideElement, onClosePortal } = params;
  const { portalElement, animationTime } = props;
  portalElement.addEventListener('close', onClosePortal);
  setTimeout(() => { slideElement.focus(); }, animationTime);
}
