import { Component, inject } from '@angular/core';
import { OfferService } from '../data/offer.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { rankCandidatesForOffer } from '@app/shared/utils/candidate-offer-matching';

@Component({
  selector: 'app-offer-detail',
  imports: [AsyncPipe, TranslateModule, RouterLink],
  templateUrl: './offer-detail.component.html',
})
export class OfferDetailComponent {
  private readonly offerService = inject(OfferService);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly offer$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => this.offerService.getById(Number(params.get('id')))),
  );
  readonly candidates$ = this.activatedRoute.data.pipe(
    map((data) => data['candidates'])
  );
  readonly matches$ = combineLatest([this.offer$, this.candidates$]).pipe(
    map(([offer, candidates]) => offer ? rankCandidatesForOffer(candidates, offer).filter(scoreMatch => scoreMatch.score.totalScore > 0) : [])
  );
}