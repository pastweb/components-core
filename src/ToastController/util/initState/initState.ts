import { getToastY } from '../getToastY';
import type { ToastControllerDefaultProps, ToastControllerState } from '../../types';

export function initState(props: ToastControllerDefaultProps): ToastControllerState {
  const { position } = props;

  const [y, x] = (position as string).split('-');

  return {
    isOpen: true,
    top: y === 'top' ? getToastY(props) : 0,
    bottom: y === 'bottom' ? getToastY(props) : 0,
    y,
    x,
  };
}
