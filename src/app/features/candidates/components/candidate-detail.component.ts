import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { switchMap, map } from 'rxjs/operators';
import { CandidateService } from '../data/candidate.service';
import { Candidate } from '../models/candidate.model';
import { CandidateAvatar } from './candidate-avatar.component';
import { rankOffersForCandidate } from '@app/shared/utils/candidate-offer-matching';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-candidate-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, TranslateModule, CandidateAvatar],
  templateUrl: './candidate-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly candidateService = inject(CandidateService);
  private avatarErrorForId: number | null = null;

  readonly candidate$ = this.route.paramMap.pipe(
    switchMap((params) => this.candidateService.getById(Number(params.get('id'))))
  );
  readonly offers$ = this.route.data.pipe(
    map((data) => data['offers'])
  );
  readonly matches$ = combineLatest([this.candidate$, this.offers$]).pipe(
    map(([candidate, offers]) => rankOffersForCandidate(offers, candidate).filter(scoreMatch => scoreMatch.score.totalScore > 0))
  );

  shouldShowAvatar(candidate: Candidate) {
    return !!candidate.avatar && this.avatarErrorForId !== candidate.id;
  }

  markAvatarError(candidateId: number) {
    this.avatarErrorForId = candidateId;
  }
}
