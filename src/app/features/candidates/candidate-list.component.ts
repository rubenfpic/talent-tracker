import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { combineLatest, map, startWith } from 'rxjs';

import { CandidateService } from '../../core/candidate.service';
import { AuthService } from '../../core/auth.service';
import { Candidate } from '../../core/models';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './candidate-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {
  private readonly candidateService = inject(CandidateService);
  private readonly auth = inject(AuthService);
  private readonly translate = inject(TranslateService);

  readonly filterControl = new FormControl<string>('', { nonNullable: true });
  readonly info = signal('');
  readonly isAdmin$ = this.auth.user$.pipe(map((user) => user?.role === 'admin'));

  readonly candidates$ = combineLatest([
    this.candidateService.candidates$,
    this.filterControl.valueChanges.pipe(startWith(''))
  ]).pipe(map(([candidates, term]) => this.filterCandidates(candidates, term)));

  ngOnInit() {
    this.candidateService.load(true).subscribe();
  }

  refresh() {
    this.candidateService.load(true).subscribe();
    this.info.set(this.translate.instant('candidates.localOnly'));
  }

  delete(id: number) {
    if (!this.auth.hasRole('admin')) {
      this.info.set(this.translate.instant('candidates.deleteBlocked'));
      return;
    }
    this.candidateService.deleteLocal(id);
    this.info.set(this.translate.instant('candidates.deleteConfirm'));
  }

  private filterCandidates(candidates: Candidate[], term: string) {
    if (!term?.trim()) {
      return candidates;
    }
    const value = term.toLowerCase();
    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(value) || candidate.email.toLowerCase().includes(value)
    );
  }
}
