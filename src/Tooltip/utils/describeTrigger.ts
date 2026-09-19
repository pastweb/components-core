/** Adds this Tooltip's id to the trigger's focusable element description. */
export function describeTrigger(trigger: HTMLElement, tooltipId: string | undefined): void {
  if (!tooltipId) return;
  const target = trigger.querySelector<HTMLElement>(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
  ) ?? trigger;
  const existing = target.getAttribute('aria-describedby');
  const describedBy = [...new Set([...(existing ? existing.split(/\s+/) : []), tooltipId].filter(Boolean))].join(' ');
  if (describedBy) target.setAttribute('aria-describedby', describedBy);
}
