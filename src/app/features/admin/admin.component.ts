import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, USER_ROLES } from '@app/core/auth';
import { CandidateService } from '../candidates/data/candidate.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AsyncPipe, TranslateModule],
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  private readonly candidateService = inject(CandidateService);
  private readonly auth = inject(AuthService);
  readonly candidates$ = this.candidateService.candidates$;

  reset() {
    this.candidateService.load(true).subscribe();
  }

  delete(id: number) {
    if (!this.auth.hasRole(USER_ROLES.admin)) {
      return;
    }
    this.candidateService.deleteLocal(id);
  }
}
