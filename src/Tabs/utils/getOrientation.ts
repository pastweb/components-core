import type { TabsOrientation } from '../types';

/**
 * Derives the semantic Tabs orientation from its positioning utility class.
 *
 * @example
 * ```ts
 * getOrientation('is-left custom-tabs');
 * // 'vertical'
 * ```
 */
export function getOrientation(className: string): TabsOrientation {
  return /(?:^|\s)is-(?:left(?:-(?:top|bottom))?|right(?:-(?:top|bottom))?)(?=\s|$)/.test(className)
    ? 'vertical'
    : 'horizontal';
}
