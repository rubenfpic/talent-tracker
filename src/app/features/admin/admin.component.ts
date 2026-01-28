import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, USER_ROLES } from '@app/core/auth';
import { CandidateService } from '../candidates/data/candidate.service';
import { OfferService } from '../offers/data/offer.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AsyncPipe, TranslateModule],
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  private readonly candidateService = inject(CandidateService);
  private readonly offerService = inject(OfferService);
  private readonly auth = inject(AuthService);
  readonly candidates$ = this.candidateService.candidates$;
  readonly offers$ = this.offerService.offers$;

  reset() {
    this.candidateService.loadAll({ reset: true }).subscribe();
    this.offerService.loadAll({ reset: true }).subscribe();
  }

  deleteCandidate(id: number) {
    if (!this.auth.hasRole(USER_ROLES.admin)) {
      return;
    }
    this.candidateService.removeFromCache(id);
  }

  deleteOffer(id: number) {
    if (!this.auth.hasRole(USER_ROLES.admin)) {
      return;
    }
    this.offerService.removeFromCache(id);
  }
}
