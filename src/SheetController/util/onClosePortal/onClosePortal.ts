import type { SheetControllerDefaultProps } from '../../types';

export function onClosePortal(props: SheetControllerDefaultProps, closePopover: () => void) {
  const { entryId } = props;

  return (e: any) => {
    if (e.type === 'close' && (e.detail.entryId === '*' || e.detail.entryId === entryId)) {
      closePopover();
    }
  };
}
