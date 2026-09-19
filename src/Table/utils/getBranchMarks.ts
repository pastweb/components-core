export const BRANCH_CONTINUE = '│';
export const BRANCH_END = '└';
export const BRANCH_BLANK = '\u00A0';

export type BranchMark = typeof BRANCH_CONTINUE | typeof BRANCH_END | typeof BRANCH_BLANK;

/**
 * Returns one guide mark per depth level for an expandable row.
 *
 * Ancestor slots keep `│` while that ancestor still has siblings after it.
 * A last ancestor uses a blank. The current level is `└` when last, otherwise `│`.
 * Root rows have depth 0 and return no marks.
 *
 * @example
 * ```ts
 * getBranchMarks(1, false, []); // ['│']
 * getBranchMarks(1, true, []); // ['└']
 * getBranchMarks(3, true, [false, true]); // ['│', '\u00A0', '└']
 * ```
 */
export function getBranchMarks(
  depth: number,
  isLast: boolean,
  ancestorIsLast: boolean[] = [],
): BranchMark[] {
  return Array.from({ length: depth }, (_, level) => {
    if (level === depth - 1) return isLast ? BRANCH_END : BRANCH_CONTINUE;
    return ancestorIsLast[level] ? BRANCH_BLANK : BRANCH_CONTINUE;
  });
}

/**
 * Ancestor last-sibling flags for a row's children.
 *
 * Root rows do not occupy a guide column, so their last-sibling flag is omitted.
 *
 * @example
 * ```ts
 * getChildAncestorIsLast([], 0, false); // []
 * getChildAncestorIsLast([], 1, false); // [false]
 * getChildAncestorIsLast([false], 2, true); // [false, true]
 * ```
 */
export function getChildAncestorIsLast(
  ancestorIsLast: boolean[],
  depth: number,
  isLast: boolean,
): boolean[] {
  return depth > 0 ? [...ancestorIsLast, isLast] : ancestorIsLast;
}
