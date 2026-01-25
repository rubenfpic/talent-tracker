import { Component, inject } from '@angular/core';
import { OfferService } from '../data/offer.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-offer-detail',
  imports: [AsyncPipe, TranslateModule, RouterLink],
  templateUrl: './offer-detail.component.html',
})
export class OfferDetailComponent {
  private readonly offerService = inject(OfferService);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly offer$ = this.activatedRoute.paramMap.pipe(switchMap((params) => this.offerService.getById(Number(params.get('id')))));

}
