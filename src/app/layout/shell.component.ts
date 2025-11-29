import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../core/auth/auth.service';
import { NavButtonsComponent } from './nav-buttons.component';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, TranslateModule, NavButtonsComponent],
  templateUrl: './shell.component.html'
})
export class ShellComponent {
  private readonly auth = inject(AuthService);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  readonly user$ = this.auth.user$;
  readonly languages = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ] as const;
  readonly lang$ = this.translate.onLangChange.pipe(
    map((event) => event.lang),
    startWith(this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en')
  );

  constructor() {
    if (!this.translate.getCurrentLang()) {
      const fallback = this.translate.getFallbackLang() || 'en';
      this.translate.use(fallback);
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
