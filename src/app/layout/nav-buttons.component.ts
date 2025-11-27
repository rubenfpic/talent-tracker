import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-nav-buttons',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, TranslateModule],
  templateUrl: './nav-buttons.component.html'
})
export class NavButtonsComponent {
  private readonly auth = inject(AuthService);

  readonly isAdmin$ = this.auth.user$.pipe(map((user) => user?.role === 'admin'));
}
