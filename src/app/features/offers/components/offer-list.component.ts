import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OfferService } from '../data/offer.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Offer } from '../models/offer.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';


@Component({
  selector: 'app-offer-list',
  imports: [TranslateModule, ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './offer-list.component.html',
})
export class OfferListComponent {
  private readonly offerService = inject(OfferService);
  private readonly translate = inject(TranslateService);

  readonly filterControl = new FormControl<string>('', { nonNullable: true });
  readonly offers$ = combineLatest([
    this.offerService.offers$,
    this.filterControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith('')
    )
  ]).pipe(map(([candidates, term]) => this.filterOffers(candidates, term)));


  private filterOffers(offers: Offer[], term: string) {
    if (!term?.trim()) {
      return offers;
    }
    const value = term.toLowerCase();
    return offers.filter(
      (offer) => {
        const translatedLocation = offer.locationKey
          ? this.translate.instant(`locations.${offer.locationKey}`).toLowerCase()
          : '';
        const translatedTitle = this.translate
          .instant(`titles.${offer.titleKey}`)
          .toLowerCase();
        const offerTags = offer.tags ?? []
        const normalizedTags = offerTags.map((tag) => tag.toLowerCase());
        
        return (
          normalizedTags.some((tag) => tag.includes(value)) ||
          offer.company.toLowerCase().includes(value) ||
          translatedTitle.includes(value) ||
          offer.location.toLowerCase().includes(value) ||
          translatedLocation.includes(value)
        );
      }
    );
  }

}
