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
    // Assert
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

  it('shouldShowAvatar(): true si hay avatar y no hay error, false tras markAvatarError()', () => {
    // Arrange
    const candidate: any = { id: 1, avatar: 'avatar.png' }
    // Assert
    expect(component.shouldShowAvatar(candidate)).toBe(true);
    // Act
    component.markAvatarError(candidate.id);
    // Assert
    expect(component.shouldShowAvatar(candidate)).toBe(false);
  });

  it('filterControl empieza como un string vacío', () => {
    // Assert
    expect(component.filterControl.value).toBe('');
  });

});
