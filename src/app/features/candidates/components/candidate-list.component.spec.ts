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
    // ASSERT
    expect(component).toBeTruthy();
  });

  it('shouldShowAvatar(): true si hay avatar y no hay error, false tras markAvatarError()', () => {
    // ARRANGE
    const candidate: any = { id: 1, avatar: 'avatar.png' }
    // ASSERT
    expect(component.shouldShowAvatar(candidate)).toBe(true);
    // ACT
    component.markAvatarError(candidate.id);
    // ASSERT
    expect(component.shouldShowAvatar(candidate)).toBe(false);
  });

  it('filterControl empieza como un string vacío', () => {
    // ASSERT
    expect(component.filterControl.value).toBe('');
  });

});
