import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';
import { CandidateService } from '../../core/candidate.service';

@Component({
  selector: 'app-candidate-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, TranslateModule],
  templateUrl: './candidate-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly candidateService = inject(CandidateService);
  readonly candidate$ = this.route.paramMap.pipe(
    switchMap((params) => this.candidateService.getCandidate(Number(params.get('id'))))
  );
}
