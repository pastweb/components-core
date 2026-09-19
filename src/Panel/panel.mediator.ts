import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  getAriaLabel,
  getHeading,
  getPanelId,
  getTitleId,
  onClose,
  onMaximize,
  onMinimize,
  updateState,
  useBeforeUnmount,
} from './utils';
import type { PanelDefaultProps, PanelMediator, PanelState } from './types';

export function panelMediator(props: PanelDefaultProps): PanelMediator {
  const uid = idCache.getId('panel');
  const id = getPanelId(props, uid);
  const titleId = getTitleId(props, id);

  const state = reactive<PanelState>({
    ariaLabel: getAriaLabel(props, titleId),
    heading: getHeading(props),
    id,
    titleId,
  });

  effect(
    () => updateState(props, state, uid),
    () => [props.ariaLabel, props.headingLevel, props.id, props.title],
  );

  return {
    onClose: () => onClose(props),
    onMaximize: () => onMaximize(props),
    onMinimize: () => onMinimize(props),
    state,
    useBeforeUnmount: () => useBeforeUnmount(uid),
  };
}
