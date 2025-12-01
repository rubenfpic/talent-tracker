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
  private readonly cache$ = new BehaviorSubject<Candidate[]>([]);

  readonly candidates$ = this.cache$.asObservable();

  // Carga la lista usando la caché salvo que se fuerce.
  // Si remoto está desactivado o falla, usa el mock.
  loadAll(force = false) {
    if (!force && this.cache$.value.length) {
      return this.candidates$;
    }

    if (!this.useRemote) {
      const fallback = this.fallbackCandidates();
      this.cache$.next(fallback);
      return of(fallback);
    }

    return this.http
      .get<ReqresListResponse>(`${this.api}?per_page=12`, { withCredentials: false })
      .pipe(
        map((response) => response.data.map((user, index) => mapReqresUserToCandidate(user, index))),
        tap((candidates) => this.cache$.next(candidates)),
        catchError(() => {
          const fallback = this.fallbackCandidates();
          this.cache$.next(fallback);
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
          tap((item) => this.cache$.next([...this.cache$.value, item]))
        );
      })
    );
  }

  // Elimina un candidato de la caché local (demo admin).
  removeFromCache(id: number) {
    this.cache$.next(this.cache$.value.filter((candidate) => candidate.id !== id));
  }

  // Devuelve los candidatos del mock (datos completos).
  private fallbackCandidates(): Candidate[] {
    return mockCandidates.map((candidate) => ({ ...candidate }));
  }
}
