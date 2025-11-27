import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { combineLatest, map, startWith } from 'rxjs';
import { CandidateService } from '../../core/candidate.service';
import { Candidate } from '../../core/models';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './candidate-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {
  private readonly candidateService = inject(CandidateService);
  private readonly translate = inject(TranslateService);

  readonly filterControl = new FormControl<string>('', { nonNullable: true });

  readonly candidates$ = combineLatest([
    this.candidateService.candidates$,
    this.filterControl.valueChanges.pipe(startWith(''))
  ]).pipe(map(([candidates, term]) => this.filterCandidates(candidates, term)));

  ngOnInit() {
    this.candidateService.load(true).subscribe();
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
