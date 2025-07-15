import { noop } from '@pastweb/tools';
import { getToastY } from '../getToastY';
import type { ToastControllerDefaultProps, ToastData, ToastControllerState } from '../../types';

export function calculateY(
  props: ToastControllerDefaultProps,
  data: ToastData,
  state: ToastControllerState,
  setState: (state: Partial<ToastControllerState>) => void = noop
): void {
  const { toastIndex } = data;
  const { y } = state;
  const top = y === 'top' ? getToastY(props) : 0;
  const bottom = y === 'bottom' ? getToastY(props) : 0;

  data.toastIndex = toastIndex - 1;
  setState({
    top,
    bottom,
  });
}
