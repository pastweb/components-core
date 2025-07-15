import { createState, effect } from '@pastweb/tools';
import type { SelectDefaultProps, SelectMediator, SelectState } from './types';

export function select(props: SelectDefaultProps): SelectMediator {
  let label: HTMLElement;
  let list: HTMLElement;
  let current: HTMLElement | null = null;

  const { state, setState } = createState<SelectState>({
    isOpen: false,
    value: props.value,
    highlightIndex: props.options.findIndex((option) => option.value === props.value) || null,
  });

  effect<SelectDefaultProps>(props, ({ value }) => {
    if (value === state.value) return;

    setState({ value });
  }, 'value');

  function open(): void {
    if (props.disabled || props.isLoading) return;
    current = list.children[0] as HTMLElement;
    setState({ isOpen: true });
  }

  function close(value: any = state.value): void {
    if (props.disabled || props.isLoading) return;
    label.focus();
    setState({ value, isOpen: false, highlightIndex: null });
  }

  function onChange(value: any): void {
    if (props.disabled || props.isLoading) return;

    close(value);
    props.onChange(value);
  }

  function onClick(e: any): void {
    e.stopPropagation();
    if (props.disabled || props.isLoading) return;

    if (state.isOpen) close();
    else open();
  }

  function onClickOut(): void {
    if (props.disabled || !state.isOpen) return;
    close();
  }

  function selectPrevious(e: any): void {
    if (props.disabled || !state.isOpen) return;

    const { options } = props;
    let highlightIndex = state.highlightIndex;

    switch (state.highlightIndex) {
      case 0:
      case null:
        if (e.key === 'Tab' && e.shiftKey) {
          close();
          return;
        }
        highlightIndex = options.length - 1;
        break;
      default:
        highlightIndex = state.highlightIndex - 1;
        break;
    }

    current = list.children[highlightIndex] as HTMLElement;
    current.focus();
    setState({ highlightIndex });
  }

  function selectNext(e: any): void {
    if (props.disabled || !state.isOpen) return;

    const { options } = props;
    let highlightIndex = state.highlightIndex;

    switch (state.highlightIndex) {
      case options.length - 1:
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

    current = list.children[highlightIndex] as HTMLElement;
    current.focus();
    setState({ highlightIndex });
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
    switch (e.key) {
      case 'Enter':
      case ' ':
        onChange(value);
        break;
        defalut: onKeyDown(e);
    }
  }

  function onMounted(labelElement: HTMLElement, listElement: HTMLElement): void {
    label = labelElement;
    list = listElement;

    list.addEventListener('blur', close);
    window.addEventListener('click', onClickOut);
  }

  function onUnmounted() {
    list.removeEventListener('blur', close);
    window.removeEventListener('click', onClickOut);
  }

  return { state, onChange, onClick, onKeyDown, onOptionKeyDown, onMounted, onUnmounted };
}
