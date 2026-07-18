import { reactive, effect } from '@pastweb/tools';
import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { idCache } from '../utils';
import type { DropDownDefaultProps, DropDownMediator, DropDownState, DropDownContext } from './types';

export function dropdownMediator(props: DropDownDefaultProps): DropDownMediator {
  const uid = idCache.getId();

  const state = reactive<DropDownState>({
    isVisible: !!props.isVisible,
    uid,
    triggerId: `dropdown-trigger${uid}`,
    menuId: `dropdown-menu${uid}`,
  });

  effect(
    isVisible => { state.isVisible = isVisible; },
    () => props.isVisible,
  );

  effect(
    () => {
      removeEventListeners();
      addEventListeners();

      if (state.isVisible) updatePosition();
    },
    () => props.visibleOn,
  );

  effect(
    ([isVisible]) => {
      if (isVisible) updatePosition();
      props.onChange(isVisible);
    },
    [() => state.isVisible, () => props.arrow, props.placement],
  );

  let rootEl: HTMLElement;
  let targetEl: HTMLElement;
  let containerEl: HTMLElement;
  let contentEl: HTMLElement;
  let arrowEl: HTMLElement | null | undefined;

  let elementClicked = false; // this is used as help to determinate is the user click out

  // porps and state are passed here to be reactive
  function getContext(props: DropDownDefaultProps, state: DropDownState): DropDownContext {
    return { props, onClick, onKeyDown, registerContent, registerTarget, setArrowRef, state };
  }

  function updatePosition() {
    const { placement } = props;

    // Get trigger's bounding box relative to the viewport
    const rect = targetEl.getBoundingClientRect();

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

    const offsetValue = props.arrow && arrowEl ? parseFloat(getComputedStyle(arrowEl as HTMLElement).width) / 2 : props.offset;
    const cs = props.arrow ? getComputedStyle(contentEl as HTMLElement) : null;
    const borderWidth = props.arrow ? parseFloat((cs as CSSStyleDeclaration).borderWidth) : 0;
    const borderRadious = props.arrow ? parseFloat((cs as CSSStyleDeclaration).borderRadius) : 0;
    const height = props.arrow ? parseFloat((cs as CSSStyleDeclaration).height) : 0;

    computePosition(virtualReference, containerEl, {
      placement,
      middleware: [
        offset(offsetValue),
        shift({ padding: 3 }),
        ...props.arrow ? [arrow({ element: arrowEl as HTMLElement })] : [],
        flip(),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      // Ensure position is relative to viewport
      if (!props.arrow) {
        Object.assign(containerEl.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        return;
      }

      const { x: arrowX, y: arrowY } = middlewareData.arrow as any;
      const staticSide = {
        top: 'top',
        right: 'left',
        bottom: 'bottom',
        left: 'right',
      }[placement.split('-')[0]] as string;

      const sideValue: Record<string, string> = {
        left: `-${(offsetValue * 2) + (borderWidth - (borderRadious / 2))}px`,
        right: `-${(offsetValue * 2) + (borderWidth - (borderRadious / 2))}px`,
        top: `${height}px`,
        bottom: `-${offsetValue * 2}px`,
      };

      const arrowDeg: Record<string, number> = {
        top: 180,
        right: 270,
        bottom: 0,
        left: 90,
      };

      const currPlacement = middlewareData.offset?.placement || placement;
      const [finalPlacement, position] = currPlacement.split('-');
      // const left = arrowX != null ? `${!position ? arrowX : position === 'start' ? arrowY + borderRadious : arrowY - borderRadious}px` : ''
      const top = arrowY != null ? `${!position ? arrowY : position === 'start' ? arrowY - (borderRadious / 2) : arrowY + (borderRadious / 2)}px` : ''

      Object.assign(containerEl.style, {
        left: `${finalPlacement === 'left' ? x + (offsetValue - 5) : finalPlacement === 'right' ? x - (offsetValue - 5) : x}px`,
        top: `${!position ? y : position === 'start' ? y + (borderRadious / 2) : y - (borderRadious / 2)}px`,
      });

      if (!arrowEl) return;

      Object.assign((arrowEl as HTMLElement).style, {
        top,
        // top: arrowY != null ? `${arrowY}px` : '',
        // left,
        left: arrowX != null ? `${finalPlacement === 'left' || finalPlacement === 'right' ? arrowX - 10 : arrowX}px` : '',
        [staticSide === 'bottom' ? 'top' : staticSide]: sideValue[staticSide],
        transform: `rotate(${arrowDeg[finalPlacement]}deg)`,
      });
    });
  }

  function registerTarget(target: HTMLElement): void {
    targetEl = target;
  }

  function registerContent(
    container: HTMLElement,
    content: HTMLElement,
    arrow?: HTMLElement | null,
  ): void {
    containerEl = container;
    contentEl = content;
    arrowEl = arrow;
  }

  function onClick() {
    const { disabled, visibleOn, onClick, clickTimeGap } = props;
    if (disabled || visibleOn !== 'click') return;

    elementClicked = true;

    setTimeout(() => {
      elementClicked = false;
      state.isVisible = !state.isVisible;
      onClick();
    }, clickTimeGap);
  }

  function onContext(e: any) {
    if (props.disabled || props.visibleOn !== 'context') return;

    e.preventDefault();
    elementClicked = true;

    setTimeout(() => {
      elementClicked = false;
      state.isVisible = !state.isVisible;
      props.onContext();
    }, props.clickTimeGap);
  }

  function onClickOut() {
    if (
      props.disabled ||
      !state.isVisible ||
      elementClicked ||
      !props.hideOnClickOut
    ) return;

    state.isVisible = false;
    props.onClickOut();
  }

  function onBlur() {
    if (
      props.disabled ||
      !state.isVisible ||
      !props.hideOnBlur
    ) return;

    state.isVisible = false;
  }

  function onMouseEnter(): void {
    if (props.disabled || props.visibleOn !== 'over') return;

    state.isVisible = true;
    props.onMouseEnter();
  }


  function onMouseLeave(): void {
    if (props.disabled || props.visibleOn !== 'over') return;

    state.isVisible = false;
    props.onMouseLeave();
  }

  function onKeyDown(e: any): void {
    if (e.key === 'Enter' || e.key === 'Space') onClick();
  }

  function addEventListeners(): void {
    if (!rootEl) return;

    switch (props.visibleOn) {
      case 'click':
      case 'context':
        window.addEventListener('click', onClickOut);
        break;
    }
  }

  function removeEventListeners(): void {
    if (!rootEl) return;

    switch (props.visibleOn) {
      case 'click':
      case 'context':
        window.removeEventListener('click', onClickOut);
        break;
    }
  }

  function setArrowRef(arrow?: HTMLElement | null) {
    arrowEl = arrow;
  }

  function onMounted(root: HTMLElement): void {
    rootEl = root;
    addEventListeners();
    updatePosition();
  }

  const onUnmount = () => {
    removeEventListeners();
    idCache.removeId(uid);
  }

  return {
    onBlur,
    onClick,
    onContext,
    onMounted,
    onMouseEnter,
    onMouseLeave,
    onUnmount,
    onKeyDown,
    getContext,
    registerContent,
    registerTarget,
    setArrowRef,
    state,
  };
}
