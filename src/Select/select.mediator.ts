import { effect, reactive, kebabize } from '@pastweb/tools';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { SelectDefaultProps, SelectMediator, SelectState } from './types';

export function selectMediator(props: SelectDefaultProps): SelectMediator {
  let targetEl: HTMLElement;
  let listEl: HTMLElement;
  let current: HTMLElement | null = null;
  let itemsCounter = 0;

  const state = reactive<SelectState>({
    inputId: getInputId(),
    isOpen: false,
    value: props.value,
    highlightIndex: null,
  });

  effect(
    value => { if (value !== state.value) state.value = value; },
    () => props.value,
  );

  effect(
    () => { state.inputId = getInputId(); },
    [() => props.id, () => props.name, () => props.label],
  );

  const registerItem = () => itemsCounter++;

  function getInputId(): string {
    const { id, name, label } = props;

    return id ? id : name ? `select-${name}` : label ? `select-${kebabize(label)}` : 'select';
  }

  function open(): void {
    if (props.disabled || props.className.includes('is-loading')) return;

    current = listEl.children[0] as HTMLElement;
    updatePosition();
    state.isOpen = true;
  }

  function close(value: any = state.value): void {
    if (props.disabled || props.className.includes('is-loading')) return;

    state.value = value;
    state.isOpen = false;
    state.highlightIndex = null;
    targetEl.focus();
  }

  function updatePosition() {
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

    computePosition(virtualReference, listEl, {
      placement: 'bottom',
      middleware: [
        offset(props.offset),
        shift({ padding: 3 }),
        flip(),
      ],
    }).then(({ x, y, }) => {
      // Ensure position is relative to viewport
      Object.assign(listEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  function onChange(value: any): void {
    if (props.disabled || props.className.includes('is-loading')) return;

    close(value);
    props.onChange(value);
  }

  function onClick(e: any): void {
    e.stopPropagation();
    if (props.disabled || props.className.includes('is-loading')) return;

    if (state.isOpen) close();
    else open();
  }

  function onClickOut(): void {
    if (props.disabled || !state.isOpen) return;
    close();
  }

  function onBlur() {
    close();
  }

  function selectPrevious(e: any): void {
    if (props.disabled || !state.isOpen) return;

    let highlightIndex = state.highlightIndex;

    switch (state.highlightIndex) {
      case 0:
      case null:
        if (e.key === 'Tab' && e.shiftKey) {
          close();
          return;
        }
        highlightIndex = itemsCounter;
        break;
      default:
        highlightIndex = state.highlightIndex - 1;
        break;
    }

    current = listEl.children[highlightIndex] as HTMLElement;
    current.focus();
    state.highlightIndex = highlightIndex;
  }

  function selectNext(e: any): void {
    if (props.disabled || !state.isOpen) return;

    let highlightIndex = state.highlightIndex;

    switch (state.highlightIndex) {
      case itemsCounter:
      case null:
        if (e.key === 'Tab') {
          close();
          return;
        }
        highlightIndex = 0;
        break;
      default:
        highlightIndex = state.highlightIndex + 1;
        break;
    }

    current = listEl.children[highlightIndex] as HTMLElement;
    current.focus();
    state.highlightIndex = highlightIndex;
  }

  function onKeyDown(e: any) {
    switch (e.key) {
      case 'Escape':
        close();
        break;
      case 'Enter':
      case ' ':
        onClick(e);
        break;
      case 'ArrowUp':
        selectPrevious(e);
        break;
      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) selectPrevious(e);
        else selectNext(e);
        break;
      case 'ArrowDown':
        selectNext(e);
        break;
    }
  }

  function onOptionKeyDown(e: any, value: any) {
    if (e.key === 'Enter' || e.key === ' ') onChange(value);
    else onKeyDown(e);
  }

  function onMounted(targetElement: HTMLElement, listElement: HTMLElement): void {
    targetEl = targetElement;
    listEl = listElement;

    window.addEventListener('click', onClickOut);
    updatePosition();
  }

  function onUnmounted() {
    window.removeEventListener('click', onClickOut);
  }

  return {
    state,
    onBlur,
    onChange,
    onClick,
    onKeyDown,
    onOptionKeyDown,
    onMounted,
    onUnmounted,
    registerItem,
  };
}
