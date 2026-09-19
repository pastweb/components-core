/**
 * Creates a mediator-owned Tabs relationship ID.
 *
 * @example
 * ```ts
 * getRelationshipId(uid, 'tab', 0);
 * ```
 */
export function getRelationshipId(
  uid: string,
  part: 'panel' | 'tab',
  index: number,
): string {
  return `${part}${uid}${index}`;
}
