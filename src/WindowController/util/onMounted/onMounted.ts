import interact from 'interactjs';
import { MODE } from '../../constants';
import type { WindowControllerDefaultProps, WindowControllerVars } from '../../types';

export function onMounted(params: {
  props: WindowControllerDefaultProps;
  windowElement: HTMLElement;
  onClosePortal: (e: any) => void;
  bringToFront: (activate?: boolean) => void;
  vars: WindowControllerVars;
}): void {
  const { props, windowElement, onClosePortal, bringToFront, vars } = params;
  const { animation, entryId, manager, portalElement, width, height, mode, resizable, moveCursor, resizeCursor } = props;
  const draggingClass = props.cls('is-dragging');

  portalElement.addEventListener('close', onClosePortal);
  vars.previousFocus = typeof document !== 'undefined' && document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;
  vars.windowElement = windowElement;

  if (width) windowElement.style.width = `${width}px`;
  if (height) windowElement.style.height = `${height}px`;

  setTimeout(() => {
    windowElement.focus();
  }, ((animation.in?.animationDuration || 1) * 1000) / 2);

  if (mode === MODE.floating || resizable) {
    const parent = windowElement.parentElement as HTMLElement;
    vars.mountElement = parent;

    const portalParent = portalElement.parentElement as HTMLElement;
    const parentRect = portalParent.getBoundingClientRect();
    const winRect = windowElement.getBoundingClientRect();
    const { width, height } = winRect;
    const x = (parentRect.width / 2) - (width / 2);
    const y = (parentRect.height / 2) - (height / 2);
    const position = { x, y };
    const size = { width, height };

    setTimeout(() => {
      if (manager?.setBounds(entryId, { ...position, ...size })) return;
      setTimeout(() => manager?.setBounds(entryId, { ...position, ...size }));
    });


    if (mode === MODE.floating) {
      windowElement.onmousedown = () => bringToFront();
      windowElement.style.position = 'absolute';
      windowElement.style.left = `${position.x}px`;
      windowElement.style.top = `${position.y}px`;

      interact(windowElement).draggable({
        ignoreFrom: 'a, button, input, select, textarea, [data-window-no-drag]',
        cursorChecker: () => moveCursor ? 'move' : 'auto',
        listeners: {
          start() {
            windowElement.classList.add(draggingClass);
          },
          move(event) {
            position.x += event.dx;
            position.y += event.dy;

            Object.assign(event.target.style, {
              position: 'absolute',
              left: `${position.x}px`,
              top: `${position.y}px`,
            });

            bringToFront(false);
          },
          end() {
            manager?.setBounds(entryId, { ...position, ...size });
            setTimeout(() => windowElement.classList.remove(draggingClass), 32);
          },
        },
      });
    }

    if (resizable) {
      interact(windowElement).resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        cursorChecker: action => {
          if (!resizeCursor) return 'auto';

          const { left, right, top, bottom } = action.edges as Record<string, boolean>;
          let cursor = '';

          if ((top && left) || (bottom && right)) cursor = 'nwse';
          if ((bottom && left) || (top && right)) cursor = 'nesw';
          if (!cursor && (top || bottom)) cursor = 'ns';
          if (!cursor && (left || right)) cursor = 'ew';

          return `${cursor}-resize`;
        },
        listeners: {
          start() {
            windowElement.classList.add(draggingClass);
          },
          move(e) {
            if (mode === MODE.floating) {
              const diff = {
                height: e.rect.height > size.height ? e.rect.height - size.height : size.height - e.rect.height,
                width: e.rect.width > size.width ? e.rect.width - size.width : size.width - e.rect.width,
              };

              if (e.deltaRect.top < 0) position.y = position.y - diff.height;
              else if (e.deltaRect.top > 0) position.y = position.y + diff.height;

              e.target.style.top = `${position.y}px`;

              if (e.deltaRect.left < 0) position.x = position.x - diff.width;
              else if (e.deltaRect.left > 0) position.x = position.x + diff.width;

              e.target.style.left = `${position.x}px`;
            }

            size.width = e.rect.width;
            size.height = e.rect.height;

            Object.assign(e.target.style, {
              width: `${e.rect.width}px`,
              height: `${e.rect.height}px`,
            });

            bringToFront(false);
          },
          end() {
            manager?.setBounds(entryId, { ...position, ...size });
            setTimeout(() => windowElement.classList.remove(draggingClass), 32);
          },
        }
      });
    }
  }
}
