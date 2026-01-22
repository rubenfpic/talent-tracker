import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { Offer } from '../models/offer.model';
import { mockOffers } from './offers.mock';

@Injectable({ providedIn: 'root' })
export class OfferService {
  private readonly storageKey = 'tt:offers:v1';
  private readonly cache$ = new BehaviorSubject<Offer[]>([]);

  readonly offers$ = this.cache$.asObservable();

  loadAll({ reset = false }: { reset?: boolean } = {}) {
    if (reset) {
      this.clearStorage();
    }

    if (!reset && this.cache$.value.length) {
      return this.offers$;
    }

    if (!reset) {
      const stored = this.readFromStorage();
      if (stored) {
        this.setCache(stored, false);
        return of(stored);
      }
    }

    const fallback = this.fallbackOffers();
    this.setCache(fallback);
    return of(fallback);
  }

  getById(id: number) {
    return this.loadAll().pipe(map((list) => list.find((offer) => offer.id === id)));
  }

  removeFromCache(id: number) {
    this.setCache(this.cache$.value.filter((offer) => offer.id !== id));
  }

  private readFromStorage(): Offer[] | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return null;
      }
      return parsed as Offer[];
    } catch {
      return null;
    }
  }

  private saveToStorage(offers: Offer[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(offers));
    } catch {
      // Ignorar errores de storage para no romper la app.
    }
  }

  private clearStorage() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // Ignorar errores de storage.
    }
  }

  private setCache(offers: Offer[], persist = true) {
    this.cache$.next(offers);
    if (persist) {
      this.saveToStorage(offers);
    }
  }

  private fallbackOffers(): Offer[] {
    return mockOffers.map((offer) => ({ ...offer }));
  }
}
