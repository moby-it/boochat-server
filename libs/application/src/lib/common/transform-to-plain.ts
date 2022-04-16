import { instanceToPlain } from 'class-transformer';

export function transformToPlain(obj: unknown) {
  return instanceToPlain(obj, { excludePrefixes: ['_'] });
}
