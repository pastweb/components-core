import { noop } from '@pastweb/tools';

// TODO move this function in @pastweb/tools as portal util
export function onClosePortal(entryId: string, closeFunction: () => void = noop) {
  return (e: any) => {
    if (e.type === 'close' && (e.detail.entryId === '*' || e.detail.entryId === entryId)) {
      closeFunction();
    }
  };
}
