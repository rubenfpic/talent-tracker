import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { take } from 'rxjs';

import { CandidateService } from './candidate.service';

/**
 * Preloads the candidate list before activating routes that need it.
 * Uses `take(1)` so the resolver completes after the first emission.
 */
export const candidatesResolver: ResolveFn<unknown> = () => {
  const candidates = inject(CandidateService);
  return candidates.load(true).pipe(take(1));
};
