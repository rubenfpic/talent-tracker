import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { OfferListComponent } from './offer-list.component';
import { OfferService } from '../data/offer.service';

describe('OfferListComponent', () => {
  let component: OfferListComponent;
  let fixture: ComponentFixture<OfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferListComponent],
      providers: [
        { provide: OfferService, useValue: { offers$: of([]) } },
        {
          provide: TranslateService,
          useValue: {
            instant: (key: string) => key,
            get: (key: string) => of(key),
            onTranslationChange: of({}),
            onLangChange: of({}),
            onDefaultLangChange: of({}),
            onFallbackLangChange: of({}),
            currentLang: 'en'
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
