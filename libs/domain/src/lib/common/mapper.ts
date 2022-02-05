export abstract class Mapper<K, T> {
  abstract map(a: K, ...args: unknown[]): T;

  abstract reverseMap(a: T, ...args: unknown[]): K;
}
