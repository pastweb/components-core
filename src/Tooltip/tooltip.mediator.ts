import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { createState } from '@pastweb/tools';
import type { TooltipMediator, TooltipProps, TooltipState } from './types';

export function tooltip(props: TooltipProps): TooltipMediator {
  const { state, setState } = createState<TooltipState>({ isVisible: false });
  let reference: HTMLElement;
  let referenceEl: HTMLElement;
  let tooltipEl: HTMLElement;
  let arrowEl: HTMLElement;

  function setVisible(): void {
    if (props.disabled) return;
    updatePosition();
    setState({ isVisible: true });
  }

  function setInVisible(): void {
    if (props.disabled) return;
    setState({ isVisible: false });
  }

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
    computePosition(virtualReference, tooltipEl, {
      placement,
      middleware: [
        offset(arrowWidth / 2),
        shift({ padding: arrowWidth / 2 }),
        arrow({ element: arrowEl }),
        flip(),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      // Ensure position is relative to viewport
      Object.assign(tooltipEl.style, {
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
        left: `-${arrowWidth - 2}px`,
        right: `-${arrowWidth - 2}px`,
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

  function onMounted(root: HTMLElement, target: HTMLElement, tooltip: HTMLElement, arrow: HTMLElement) {
    reference = root;
    referenceEl = target;
    tooltipEl = tooltip;
    arrowEl = arrow;

    reference.addEventListener('mouseenter', setVisible, false);
    reference.addEventListener('mouseleave', setInVisible, false);
  }

  function onUnmount() {
    reference.removeEventListener('mouseenter', setVisible);
    reference.removeEventListener('mouseleave', setInVisible);
  }

  return { state, onMounted, onUnmount };
}
