import { ELEMENTS_SCOPE, currentIdCache } from '@pastweb/tools';

interface IdCache {
  getId: (prefix?: string) => string;
  removeId: (id: string) => void;
  has: (id: string) => boolean;
}

export const idCache: IdCache = Object.freeze({
  getId: (prefix?: string) => currentIdCache.getId(
    ELEMENTS_SCOPE,
    prefix ? { prefix } : undefined,
  ),
  removeId: (id: string) => currentIdCache.removeId(ELEMENTS_SCOPE, id),
  has: (id: string) => currentIdCache.has(ELEMENTS_SCOPE, id),
});
