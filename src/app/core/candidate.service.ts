import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';

import { Candidate } from './models';

interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ReqresListResponse {
  data: ReqresUser[];
}

interface ReqresItemResponse {
  data: ReqresUser;
}

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private readonly http = inject(HttpClient);
  private readonly api = 'https://reqres.in/api/users';
  // Set to false to avoid hitting the public API (prevents console 401s in locked-down envs).
  private readonly useRemote = false;
  private readonly cache$ = new BehaviorSubject<Candidate[]>([]);

  readonly candidates$ = this.cache$.asObservable();

  load(force = false) {
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
        map((response) => response.data.map((user, index) => this.toCandidate(user, index))),
        tap((candidates) => this.cache$.next(candidates)),
        catchError(() => {
          const fallback = this.fallbackCandidates();
          this.cache$.next(fallback);
          return of(fallback);
        })
      );
  }

  getCandidate(id: number) {
    return this.load().pipe(
      switchMap((list) => {
        const candidate = list.find((c) => c.id === id);
        if (candidate) {
          return of(candidate);
        }
        return this.http.get<ReqresItemResponse>(`${this.api}/${id}`).pipe(
          map((response) => this.toCandidate(response.data, id)),
          tap((item) => this.cache$.next([...this.cache$.value, item]))
        );
      })
    );
  }

  deleteLocal(id: number) {
    this.cache$.next(this.cache$.value.filter((candidate) => candidate.id !== id));
  }

  private fallbackCandidates(): Candidate[] {
    return [
      {
        id: 101,
        name: 'Alex Demo',
        email: 'alex.demo@example.com',
        avatar: 'https://i.pravatar.cc/150?img=13',
        title: 'Talent Partner',
        location: 'Remote'
      },
      {
        id: 102,
        name: 'Jamie Rivers',
        email: 'jamie.rivers@example.com',
        avatar: 'https://i.pravatar.cc/150?img=24',
        title: 'People Ops',
        location: 'Madrid'
      },
      {
        id: 103,
        name: 'Taylor Brooks',
        email: 'taylor.brooks@example.com',
        avatar: 'https://i.pravatar.cc/150?img=32',
        title: 'Frontend Engineer',
        location: 'Barcelona'
      },
      {
        id: 104,
        name: 'Morgan Lee',
        email: 'morgan.lee@example.com',
        avatar: 'https://i.pravatar.cc/150?img=45',
        title: 'Recruiter',
        location: 'Valencia'
      },
      {
        id: 105,
        name: 'Jordan Vega',
        email: 'jordan.vega@example.com',
        avatar: 'https://i.pravatar.cc/150?img=47',
        title: 'People Analyst',
        location: 'Sevilla'
      },
      {
        id: 106,
        name: 'Sam Carter',
        email: 'sam.carter@example.com',
        avatar: 'https://i.pravatar.cc/150?img=56',
        title: 'Product Designer',
        location: 'Remote'
      },
      {
        id: 107,
        name: 'Casey Morgan',
        email: 'casey.morgan@example.com',
        avatar: 'https://i.pravatar.cc/150?img=64',
        title: 'HRBP',
        location: 'Bilbao'
      },
      {
        id: 108,
        name: 'Riley Chen',
        email: 'riley.chen@example.com',
        avatar: 'https://i.pravatar.cc/150?img=68',
        title: 'TA Specialist',
        location: 'Madrid'
      },
      {
        id: 109,
        name: 'Avery Stone',
        email: 'avery.stone@example.com',
        avatar: 'https://i.pravatar.cc/150?img=21',
        title: 'Employer Branding',
        location: 'Barcelona'
      },
      {
        id: 110,
        name: 'Quinn Parker',
        email: 'quinn.parker@example.com',
        avatar: 'https://i.pravatar.cc/150?img=25',
        title: 'People Ops',
        location: 'Valencia'
      },
      {
        id: 111,
        name: 'Drew Navarro',
        email: 'drew.navarro@example.com',
        avatar: 'https://i.pravatar.cc/150?img=28',
        title: 'Talent Sourcer',
        location: 'Remote'
      }
    ];
  }

  private toCandidate(user: ReqresUser, offset = 0): Candidate {
    const titles = ['Frontend Engineer', 'Talent Partner', 'People Ops', 'Product Designer'];
    const locations = ['Madrid', 'Barcelona', 'Valencia', 'Remote'];

    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      avatar: user.avatar,
      title: titles[(user.id + offset) % titles.length],
      location: locations[(user.id + offset) % locations.length]
    };
  }
}
