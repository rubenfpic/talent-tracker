import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CandidateListComponent } from './candidate-list.component';
import { CandidateService } from '../data/candidate.service';
import { TranslateService } from '@ngx-translate/core';

describe('CandidateListComponent', () => {
  let fixture: ComponentFixture<CandidateListComponent>;
  let component: CandidateListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateListComponent],
      providers: [
        { provide: CandidateService, useValue: { candidates$: of([]) } },
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
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('initials() devuelve las dos primeras iniciales de un candidato', () => {
    // Arrange
    const name1 = ' José López Martínez ';
    // Act
    const initials1 = component.initials(name1);
    // Assert
    expect(initials1).toBe('JL');
  });
});
