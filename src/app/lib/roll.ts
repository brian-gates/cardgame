/**
 * Roll an n-sided die
 * @param n The number of sides on the die
 * @returns A random number between 1 and n
 */
export function roll(n: number): number {
  return Math.floor(Math.random() * n) + 1;
}
