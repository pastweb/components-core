/** Returns the element stored by a framework-neutral Walktour reference. */
export function getTarget(ref?: { value: HTMLElement | null }): HTMLElement | null {
  return ref?.value ?? null;
}
