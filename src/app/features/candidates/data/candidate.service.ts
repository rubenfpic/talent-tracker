import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { mockCandidates } from './candidates.mock';
import { Candidate } from '../models/candidate.model';
import {
  ReqresItemResponse,
  ReqresListResponse,
  mapReqresUserToCandidate
} from './candidate-remote.mapper';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private readonly http = inject(HttpClient);
  private readonly api = 'https://reqres.in/api/users';
  // False = usar mock local. True = llamar a reqres.in para datos de demo.
  private readonly useRemote = false;
  private readonly storageKey = 'tt:candidates:v2';
  private readonly cache$ = new BehaviorSubject<Candidate[]>([]);

  readonly candidates$ = this.cache$.asObservable();

  // Public API
  //
  // Carga la lista priorizando caché en memoria y luego localStorage.
  // Si reset es true, limpia el storage y vuelve a poblar desde origen (mock o remoto).
  loadAll({ reset = false }: { reset?: boolean } = {}) {
    if (reset) {
      this.clearStorage();
    }

    if (!reset && this.cache$.value.length) {
      return this.candidates$;
    }

    if (!reset) {
      const stored = this.readFromStorage();
      if (stored) {
        this.setCache(stored, false);
        return of(stored);
      }
    }

    if (!this.useRemote) {
      const fallback = this.fallbackCandidates();
      this.setCache(fallback);
      return of(fallback);
    }

    return this.http
      .get<ReqresListResponse>(`${this.api}?per_page=12`, { withCredentials: false })
      .pipe(
        map((response) => response.data.map((user, index) => mapReqresUserToCandidate(user, index))),
        tap((candidates) => this.setCache(candidates)),
        catchError(() => {
          const fallback = this.fallbackCandidates();
          this.setCache(fallback);
          return of(fallback);
        })
      );
  }

  // Devuelve un candidato desde caché o API remota.
  // Si no está en caché y remoto está activo, lo trae y lo añade.
  getById(id: number) {
    return this.loadAll().pipe(
      switchMap((list) => {
        const candidate = list.find((c) => c.id === id);
        if (candidate) {
          return of(candidate);
        }
        return this.http.get<ReqresItemResponse>(`${this.api}/${id}`).pipe(
          map((response) => mapReqresUserToCandidate(response.data, id)),
          tap((item) => this.setCache([...this.cache$.value, item]))
        );
      })
    );
  }

  // Elimina un candidato de la caché local (demo admin).
  removeFromCache(id: number) {
    this.setCache(this.cache$.value.filter((candidate) => candidate.id !== id));
  }

  // Storage helpers
  //
  private readFromStorage(): Candidate[] | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return null;
      }
      return parsed as Candidate[];
    } catch {
      return null;
    }
  }

  private saveToStorage(candidates: Candidate[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(candidates));
    } catch {
      // Si el storage falla (modo incógnito/bloqueado), seguimos sin romper la app.
    }
  }

  private clearStorage() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // Ignorar errores de storage.
    }
  }

  private setCache(candidates: Candidate[], persist = true) {
    this.cache$.next(candidates);
    if (persist) {
      this.saveToStorage(candidates);
    }
  }

  // Mock fallback
  //
  private fallbackCandidates(): Candidate[] {
    return mockCandidates.map((candidate) => ({ ...candidate }));
  }
}
