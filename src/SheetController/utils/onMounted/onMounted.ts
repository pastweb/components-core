import type {
  SheetControllerDefaultProps,
  SheetControllerVars,
  SheetEvent,
  SheetEventTarget,
  SheetFocusableReference,
} from '../../types';

/**
 * Stores the mounted sheet, listens for portal close events, and moves focus into the dialog.
 *
 * @example
 * ```ts
 * onMounted({ props, sheet, vars, onPortalClose });
 * ```
 */
export function onMounted(params: {
  props: SheetControllerDefaultProps;
  sheet: SheetFocusableReference;
  host?: SheetEventTarget;
  vars: SheetControllerVars;
  onPortalClose: (event: SheetEvent) => void;
}): void {
  const { props, sheet, host = props.portalElement, vars, onPortalClose } = params;
  vars.previousFocus = typeof document !== 'undefined' && document.activeElement instanceof HTMLElement
    ? document.activeElement
    : undefined;
  vars.sheet = sheet;
  vars.host = host;
  host?.addEventListener?.('close', onPortalClose);
  sheet.focus?.();
}
