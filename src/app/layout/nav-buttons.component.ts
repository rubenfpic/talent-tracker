import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-nav-buttons',
  standalone: true,
  imports: [RouterLink, AsyncPipe, TranslateModule],
  template: `
    <div class="flex items-center gap-2 sm:gap-3">
      <a routerLink="/candidates" class="link text-base-100 no-underline hover:underline text-lg font-display">
        {{ 'nav.candidates' | translate }}
      </a>
      @if (isAdmin$ | async) {
        <a routerLink="/admin" class="link text-base-100 no-underline hover:underline text-lg font-display">
          {{ 'nav.admin' | translate }}
        </a>
      }
      <button class="btn btn-warning btn-sm text-warning-content" (click)="logout()">
        {{ 'nav.logout' | translate }}
      </button>
    </div>
  `
})
export class NavButtonsComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isAdmin$ = this.auth.user$.pipe(map((user) => user?.role === 'admin'));

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
