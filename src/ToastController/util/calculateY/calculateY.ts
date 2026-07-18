import { getToastY } from '../getToastY';
import type {
  ToastControllerDefaultProps,
  ToastControllerState,
  ToastData,
} from '../../types';

export function calculateY(
  props: ToastControllerDefaultProps,
  data: ToastData,
  state: ToastControllerState,
): void {
  const { toastIndex } = data;
  const { y } = state;
  const top = y === 'top' ? getToastY(props) : 0;
  const bottom = y === 'bottom' ? getToastY(props) : 0;

  data.toastIndex = toastIndex - 1;
  state.top = top;
  state.bottom = bottom;
}
