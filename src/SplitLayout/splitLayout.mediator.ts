import { effect } from '@pastweb/tools';
import type { SplitLayoutDefaultProps, SplitLayoutMediator } from './types';

export function splitLayoutMediator(props: SplitLayoutDefaultProps): SplitLayoutMediator {
  let container: HTMLElement;
  let prevPane: HTMLElement;
  let paneIndex: number;
  let size = props.orientation === 'horizontal' ? 'width' : 'height';
  let axis = props.orientation === 'horizontal' ? 'X' : 'Y';
  let pos = props.orientation === 'horizontal' ? 'left' : 'top';
  let sizes: number[] = [];
  let isDragging = false;
  let panesConter = 0;

  effect(
    (next, prev) => {
      if (next === prev) return;

      size = next === 'horizontal' ? 'width' : 'height';
      axis = next === 'horizontal' ? 'X' : 'Y';
      pos = next === 'horizontal' ? 'left' : 'top';
      sizes = [];
    },
    () => props.orientation,
  );

  const registerItem = () => panesConter++;

  function setSizes() {
    const rect = container.getBoundingClientRect() as unknown as Record<string, number>;
    const children: HTMLElement[] = [...container.children] as HTMLElement[];
    const nChildren = children.length / 2;
    const childSize = rect[size] / nChildren;

    let sizeIndex = 0;
    children.forEach((child: HTMLElement, i: number) => {
      if (/splitter-/.test(child.className)) return;

      if (i > children.length - 3) {
        child.style.display = 'flex';
        child.style.flex = '1';

        return;
      };

      sizes[sizeIndex] = props.sizes[sizeIndex] || childSize;
      (child.style as unknown as Record<string, string>)[size] = `${sizes[sizeIndex]}px`;
      sizeIndex++;
    });

    props.onSizesChange([...sizes]);
  }

  function onMouseDown(e: any, index: number) {
    e.preventDefault();
    isDragging = true;
    prevPane = (e.target as HTMLElement).previousSibling as HTMLElement;
    paneIndex = index;
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();

    const containerRect = container.getBoundingClientRect() as unknown as Record<string, number>;
    const sizeValue = (e as any)[`client${axis}`] - containerRect[pos];
    (prevPane.style as unknown as Record<string, string>)[size] = `${sizeValue}px`;
    sizes[paneIndex as number] = sizeValue;
    props.onSizesChange([...sizes]);
  }

  function onMouseUp() { isDragging = false; }

  function onMounted(containerElement: HTMLElement) {
    container = containerElement;
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    setSizes();
  }

  function onUnmounted() {
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
  }

  return {
    onMounted,
    onUnmounted,
    onMouseDown,
    registerItem,
  };
}
