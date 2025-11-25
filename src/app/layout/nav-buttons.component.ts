import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    </div>
  `
})
export class NavButtonsComponent {
  private readonly auth = inject(AuthService);

  readonly isAdmin$ = this.auth.user$.pipe(map((user) => user?.role === 'admin'));
}
