import { idCache } from '../utils';
import type { StepperMediator } from './types';

export function stepperMediator(): StepperMediator {
  const uid = idCache.getId();

  const state = { uid };

  const onUnmount = () => idCache.removeId(uid);

  return { state, onUnmount };
}
