import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateAvatar } from './candidate-avatar.component';

describe('CandidateAvatar', () => {
  let component: CandidateAvatar;
  let fixture: ComponentFixture<CandidateAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateAvatar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CandidateAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders initials when showAvatar is false', () => {
    // ARRANGE
    component.name = 'John Doe';
    component.showAvatar = false;
    //ACT
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.avatar-placeholder span');
    //ASSERT
    expect(span?.textContent?.trim()).toBe('JD');
  });
});
