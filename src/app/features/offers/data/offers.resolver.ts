import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { take } from 'rxjs';
import { OfferService } from './offer.service';

export const offersResolver: ResolveFn<unknown> = () => {
  const offers = inject(OfferService);
  return offers.loadAll().pipe(take(1));
};
