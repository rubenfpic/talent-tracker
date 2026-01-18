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
  it('emits avatarError when the image fails to load', () => {
    // ARRANGE
    component.name = 'John Doe';
    component.avatar = 'https://example.com/avatar.png';
    component.showAvatar = true;
    // ACT
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    const emitSpy = jest.spyOn(component.avatarError, 'emit');
    img.dispatchEvent(new Event('error'));
    // ASSERT
    expect(emitSpy).toHaveBeenCalled();
  });
});
