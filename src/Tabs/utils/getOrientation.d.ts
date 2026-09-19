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
export declare function getOrientation(className: string): TabsOrientation;
