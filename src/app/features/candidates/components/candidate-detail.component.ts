import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';
import { CandidateService } from '../data/candidate.service';
import { Candidate } from '../models/candidate.model';

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
  private avatarErrorForId: number | null = null;

  readonly candidate$ = this.route.paramMap.pipe(
    switchMap((params) => this.candidateService.getById(Number(params.get('id'))))
  );

  shouldShowAvatar(candidate: Candidate) {
    return !!candidate.avatar && this.avatarErrorForId !== candidate.id;
  }

  markAvatarError(candidateId: number) {
    this.avatarErrorForId = candidateId;
  }

  initials(name: string) {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
  }
}
