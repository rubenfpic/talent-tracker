import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, TranslateModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private readonly auth = inject(AuthService);

  readonly isAdmin$ = this.auth.user$.pipe(map((user) => user?.role === 'admin'));
}
