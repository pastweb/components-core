/**
 * Sets a compact drag image for a column header so the pointer ghost stays stable.
 *
 * The native snapshot can include DropDown overlays after a previous drag. The
 * clone stays in the header so table styles still apply, keeps only the visible
 * cell, and matches the pointer offset.
 *
 * @example
 * ```ts
 * setColumnDragImage(event);
 * ```
 */
export function setColumnDragImage(event: DragEvent): void {
  const source = (event.currentTarget || event.target) as HTMLElement | null;

  if (!source || !event.dataTransfer?.setDragImage) return;

  const rect = source.getBoundingClientRect();
  const ghost = source.cloneNode(true) as HTMLElement;

  ghost.querySelectorAll('[aria-hidden="true"]').forEach(node => node.remove());
  ghost.setAttribute('aria-hidden', 'true');
  Object.assign(ghost.style, {
    position: 'fixed',
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: '0',
    overflow: 'hidden',
    pointerEvents: 'none',
    boxSizing: 'border-box',
  });

  console.log(getComputedStyle(ghost).background)

  source.after(ghost);
  event.dataTransfer.setDragImage(
    ghost,
    Math.max(0, event.clientX - rect.left),
    Math.max(0, event.clientY - rect.top),
  );

  window.setTimeout(() => ghost.remove(), 0);
}
