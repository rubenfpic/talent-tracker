import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, throwError } from 'rxjs';

import { User, UserRole } from './models';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'talent-tracker.auth';
  private readonly userSubject = new BehaviorSubject<User | null>(this.restoreUser());

  readonly user$ = this.userSubject.asObservable();
  readonly isLoggedIn$ = this.user$.pipe(map(Boolean));

  login(email: string, password: string) {
    return this.http.post<LoginResponse>('https://reqres.in/api/login', { email, password }).pipe(
      map(({ token }) => this.buildUser(email, token)),
      catchError((err: HttpErrorResponse) => {
        // Fallback for demo/offline: if reqres fails, still allow a local session.
        if (err.status === 0 || err.status === 400 || err.status === 401) {
          return of(this.buildUser(email, crypto.randomUUID()));
        }
        return throwError(() => new Error('Unable to sign in. Use the demo user or check credentials.'));
      })
    );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.userSubject.next(null);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  hasRole(role: UserRole) {
    return this.userSubject.value?.role === role;
  }

  private deriveRole(email: string): UserRole {
    return email.toLowerCase().includes('admin') || email.includes('eve.holt') ? 'admin' : 'recruiter';
  }

  private deriveName(email: string): string {
    const [user] = email.split('@');
    return user.replace('.', ' ').replace(/(^\w|\s\w)/g, (c) => c.toUpperCase());
  }

  private buildUser(email: string, token: string): User {
    const user: User = {
      email,
      token,
      role: this.deriveRole(email),
      name: this.deriveName(email)
    };

    this.persistUser(user);
    this.userSubject.next(user);
    return user;
  }

  private restoreUser(): User | null {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved) as User;
    } catch {
      return null;
    }
  }

  private persistUser(user: User) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }
}
