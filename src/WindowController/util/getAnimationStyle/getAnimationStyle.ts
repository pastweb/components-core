import type { WindowControllerAnimationStyle, WindowControllerDefaultProps, WindowControllerState, WindowControllerVars } from '../../types';

/** Resolves renderer-ready animation styles for the current visibility state. */
export function getAnimationStyle(
  props: WindowControllerDefaultProps,
  state: WindowControllerState,
  vars: WindowControllerVars,
): WindowControllerAnimationStyle {
  const animation = state.isOpen ? props.animation.in : props.animation.out;
  const bounds = state.manager?.bounds;
  const taskBarButtonBounds = state.manager?.status === 'minimized'
    ? props.getTaskBarButtonBounds?.(props.entryId)
    : null;
  const windowElement = vars.windowElement;
  const windowRect = windowElement?.getBoundingClientRect();
  const minimizeStyle = windowRect && taskBarButtonBounds && windowRect.width && windowRect.height
    ? {
      opacity: '0',
      transform: `translate(${taskBarButtonBounds.x + (taskBarButtonBounds.width / 2) - (windowRect.left + (windowRect.width / 2))}px, ${taskBarButtonBounds.y + (taskBarButtonBounds.height / 2) - (windowRect.top + (windowRect.height / 2))}px) scale(${taskBarButtonBounds.width / windowRect.width}, ${taskBarButtonBounds.height / windowRect.height})`,
      transformOrigin: 'center center',
    }
    : {};

  return {
    ...(animation?.animationDelay ? { animationDelay: `${animation.animationDelay}s` } : {}),
    ...(animation?.animationDuration ? { animationDuration: `${animation.animationDuration}s` } : {}),
    ...(animation?.animationTimingFunction ? { animationTimingFunction: animation.animationTimingFunction } : {}),
    ...(bounds ? {
      height: `${bounds.height}px`,
      left: `${bounds.x}px`,
      top: `${bounds.y}px`,
      width: `${bounds.width}px`,
    } : {}),
    ...minimizeStyle,
  };
}
