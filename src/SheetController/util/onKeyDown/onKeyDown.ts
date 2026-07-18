import type { SheetControllerDefaultProps } from '../../types';

export function onKeyDown(props: SheetControllerDefaultProps, e: any, closePopover: () => void) {
  if (e.key === 'Escape') {
    closePopover();
    props.onKeyDown(e);
  }
}
