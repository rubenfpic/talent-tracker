import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OfferService } from '../data/offer.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-offer-list',
  imports: [TranslateModule, AsyncPipe, RouterLink],
  templateUrl: './offer-list.component.html',
})
export class OfferListComponent {
  private readonly offerService = inject(OfferService);
  private readonly translate = inject(TranslateService);

  offers$ = this.offerService.offers$;  
}
