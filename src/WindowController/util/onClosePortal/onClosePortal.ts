import type { WindowControllerDefaultProps } from '../../types';

export function onClosePortal(props: WindowControllerDefaultProps, closeWindow: () => void) {
  const { entryId } = props;

  return (e: any) => {
    if (e.type === 'close' && (e.detail.entryId === '*' || e.detail.entryId === entryId)) {
      closeWindow();
    }
  };
}
