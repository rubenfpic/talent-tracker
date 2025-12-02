import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, of, throwError } from 'rxjs';
import { USER_ROLES, User, UserRole } from './user.model';

const DEMO_USER_ROLES: Record<string, UserRole> = {
  'admin@demo.com': USER_ROLES.admin,
  'recruiter@demo.com': USER_ROLES.recruiter,
  'eve.holt@reqres.in': USER_ROLES.admin
};

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

  // Intenta login contra reqres; si falla (demo/offline), crea sesión local.
  login(email: string, password: string) {
    return this.http.post<LoginResponse>('https://reqres.in/api/login', { email, password }).pipe(
      map(({ token }) => this.buildUser(email, token)),
      // Si hay CORS/errores, hacemos fallback a login local para la demo.
      catchError(() =>
        of(
          this.buildUser(
            email,
            crypto.randomUUID()
          )
        )
      )
    );
  }

  // Limpia sesión y notifica.
  logout() {
    localStorage.removeItem(this.storageKey);
    this.userSubject.next(null);
  }

  // Usuario actual en memoria.
  get currentUser(): User | null {
    return this.userSubject.value;
  }

  // Comprueba rol del usuario actual.
  hasRole(role: UserRole) {
    return this.userSubject.value?.role === role;
  }

  // Determina rol según email (demo users o heurística por nombre).
  private deriveRole(email: string): UserRole {
    const normalizedEmail = email.toLowerCase();
    const demoRole = DEMO_USER_ROLES[normalizedEmail];
    if (demoRole) {
      return demoRole;
    }

    return normalizedEmail.includes(USER_ROLES.admin) ? USER_ROLES.admin : USER_ROLES.recruiter;
  }

  // Deriva un nombre legible a partir del email.
  private deriveName(email: string): string {
    const [user] = email.split('@');
    return user.replace('.', ' ').replace(/(^\w|\s\w)/g, (c) => c.toUpperCase());
  }

  // Construye usuario, persiste y actualiza el observable.
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

  // Recupera usuario almacenado en localStorage.
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

  // Guarda usuario en localStorage.
  private persistUser(user: User) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }
}
