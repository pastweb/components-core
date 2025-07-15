import { createState, effect } from '@pastweb/tools';
import { computePosition, offset, shift, arrow, flip } from '@floating-ui/dom';
import { CLICK_OUT_TIME_GAP } from './constants';
import type { DropDownDefaultProps, DropDownState, DropDownMediator } from './types';

export function dropdown(props: DropDownDefaultProps): DropDownMediator {
  const { state, setState } = createState<DropDownState>({ isVisible: !!props.isVisible });
  effect<DropDownDefaultProps>(props, ({ isVisible }) => setState({ isVisible }), 'isVisible');

  let reference: HTMLElement;
  let referenceEl: HTMLElement;
  let contentEl: HTMLElement;
  let arrowEl: HTMLElement;

  let elementClicked = false; // this is used as help to determinate is the user click out

  effect<DropDownState>(state, ({ isVisible }) => {
    if (!isVisible) return;

    updatePosition();
  }, 'isVisible');

  function updatePosition() {
    const { placement } = props;

    // Get trigger's bounding box relative to the viewport
    const rect = referenceEl.getBoundingClientRect();

    // Create a virtual reference element for viewport-based positioning
    const virtualReference = {
      getBoundingClientRect() {
        return {
          width: rect.width,
          height: rect.height,
          top: rect.top + window.scrollY,
          right: rect.right + window.scrollX,
          bottom: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
        };
      },
    };

    const arrowWidth = parseFloat(getComputedStyle(arrowEl).width);
    computePosition(virtualReference, contentEl, {
      placement,
      middleware: [
        offset(arrowWidth / 2),
        shift({ padding: 2 }),
        arrow({ element: arrowEl }),
        flip(),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      // Ensure position is relative to viewport
      Object.assign(contentEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      const { x: arrowX, y: arrowY } = middlewareData.arrow as any;
      const staticSide = {
        top: 'top',
        right: 'left',
        bottom: 'bottom',
        left: 'right',
      }[placement.split('-')[0]];

      const sideValue: Record<string, string> = {
        left: `-${arrowWidth}px`,
        right: `-${arrowWidth}px`,
        top: `${arrowWidth}px`,
        bottom: `-${arrowWidth}px`,
      };

      const arrowDeg: Record<string, number> = {
        top: 180,
        right: 270,
        bottom: 0,
        left: 90,
      };

      const finalPlacement = middlewareData.offset?.placement || placement;

      Object.assign(arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        [(staticSide as string) === 'bottom' ? 'top' : (staticSide as string)]: sideValue[staticSide as string],
        transform: `rotate(${arrowDeg[finalPlacement]}deg)`,
      });
    });
  }

  function onClick() {
    if (props.disabled) return;

    elementClicked = true;
    setState({ isVisible: !state.isVisible });
    props.onClick();

    setTimeout(() => {
      elementClicked = false;
    }, CLICK_OUT_TIME_GAP);
  }

  function onClickOut() {
    if (
      props.visibleOn !== 'click' ||
      props.disabled ||
      !state.isVisible ||
      elementClicked
    ) return;

    setState({ isVisible: false });
    props.onClickOut();
  }

  function onMouseEnter(): void {
    if (props.disabled) return;

    setState({ isVisible: true });
    props.onMouseEnter();
  }


  function onMouseLeave(): void {
    if (props.disabled) return;

    setState({ isVisible: false });
    props.onMouseLeave();
  }

  function onMounted(target: HTMLElement, content: HTMLElement, arrow: HTMLElement): void {
    reference = target;
    referenceEl = reference.firstChild as HTMLElement;
    contentEl = content;
    arrowEl = arrow;

    switch (props.visibleOn) {
      case 'over':
        reference.addEventListener('mouseenter', onMouseEnter);
        reference.addEventListener('mouseleave', onMouseLeave);
        break;
      case 'click':
        reference.addEventListener('click', onClick);
        if (props.hideOnClickOut) window.addEventListener('click', onClickOut);
        break;
    }

    updatePosition();
  }

  function onUnmount() {
    switch (props.visibleOn) {
      case 'over':
        reference.removeEventListener('mouseenter', onMouseEnter);
        reference.removeEventListener('mouseleave', onMouseLeave);
        break;
      case 'click':
        reference.removeEventListener('click', onClick);
        if (props.hideOnClickOut) window.removeEventListener('click', onClickOut);
        break;
    }
  }

  return { state, onMounted, onUnmount };
}
