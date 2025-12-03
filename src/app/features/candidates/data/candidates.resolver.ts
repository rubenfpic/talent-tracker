import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { take } from 'rxjs';

import { CandidateService } from './candidate.service';

/**
 * Precarga la lista de candidatos antes de activar rutas que la necesitan.
 * Usa `take(1)` para completar tras la primera emisión.
 */
export const candidatesResolver: ResolveFn<unknown> = () => {
  const candidates = inject(CandidateService);
  return candidates.loadAll().pipe(take(1));
};
