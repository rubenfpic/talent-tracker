import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CandidateService } from '../../core/candidate.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, TranslateModule],
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  private readonly candidateService = inject(CandidateService);
  readonly candidates$ = this.candidateService.candidates$;

  reset() {
    this.candidateService.load(true).subscribe();
  }
}
