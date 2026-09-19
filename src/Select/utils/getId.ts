/**
 * Resolves the Select host ID.
 *
 * An explicit `id` is exposed as `_${id}`. Otherwise the generated cache ID is used.
 *
 * @example
 * ```ts
 * getId(props, uid);
 * ```
 */
export function getId(
  props: { id?: string },
  uid: string,
): string {
  return props.id ? `_${props.id}` : uid;
}
