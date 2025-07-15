export { DEFAULT_PROPS } from './constants';

export {
  closeSlide,
  getParentSlide,
  onBackdropClick,
  onClosePortal,
  onKeyDown,
  onMounted,
} from './util';

export { slideController } from './slideController.mediator';

export type {
  SlideControllerProps,
  SlideControllerDefaultProps,
  SlideControllerState,
  CloseOptions,
  ParentSlide,
  SlideControllerMediator,
} from './types';
