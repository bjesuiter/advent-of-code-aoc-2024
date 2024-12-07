/**
 * A reducer function to reduce an iterator to the count of elements.
 */
export function toCount(count: number, _element: unknown): number {
  return count + 1;
}
