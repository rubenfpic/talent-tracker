import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CandidateService } from '../../core/candidate.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, TranslateModule],
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
    if (!this.auth.hasRole('admin')) {
      return;
    }
    this.candidateService.deleteLocal(id);
  }
}
