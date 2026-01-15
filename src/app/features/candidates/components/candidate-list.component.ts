import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { CandidateService } from '../data/candidate.service';
import { Candidate } from '../models/candidate.model';
import { InitialsPipe } from '../pipes/initials.pipe';
import { AutofocusDirective } from '@app/shared/directives/autofocus.directive';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink, TranslateModule, InitialsPipe, AutofocusDirective],
  templateUrl: './candidate-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent {
  private readonly candidateService = inject(CandidateService);
  private readonly translate = inject(TranslateService);

  readonly filterControl = new FormControl<string>('', { nonNullable: true });
  private avatarErrors = new Set<number>();

  readonly candidates$ = combineLatest([
    this.candidateService.candidates$,
    this.filterControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith('')
    )
  ]).pipe(map(([candidates, term]) => this.filterCandidates(candidates, term)));

  shouldShowAvatar(candidate: Candidate) {
    return !!candidate.avatar && !this.avatarErrors.has(candidate.id);
  }

  markAvatarError(candidateId: number) {
    this.avatarErrors = new Set(this.avatarErrors).add(candidateId);
  }

  private filterCandidates(candidates: Candidate[], term: string) {
    if (!term?.trim()) {
      return candidates;
    }
    const value = term.toLowerCase();
    return candidates.filter(
      (candidate) => {
        const translatedLocation = candidate.locationKey
          ? this.translate.instant(`locations.${candidate.locationKey}`).toLowerCase()
          : '';
        return (
          candidate.name.toLowerCase().includes(value) ||
          candidate.title.toLowerCase().includes(value) ||
          candidate.location.toLowerCase().includes(value) ||
          translatedLocation.includes(value)
        );
      }
    );
  }
}
