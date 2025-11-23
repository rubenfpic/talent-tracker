import { Component, computed, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AuthService } from '../core/auth.service';
import { NavButtonsComponent } from './nav-buttons.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, NgIf, TranslateModule, NavButtonsComponent],
  templateUrl: './shell.component.html'
})
export class ShellComponent {
  private readonly auth = inject(AuthService);
  private readonly translate = inject(TranslateService);

  readonly user$ = this.auth.user$;

  readonly currentLang = computed(() => this.translate.currentLang || this.translate.getDefaultLang());

  constructor() {
    if (!this.translate.currentLang) {
      this.translate.use(this.translate.getDefaultLang() || 'en');
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
