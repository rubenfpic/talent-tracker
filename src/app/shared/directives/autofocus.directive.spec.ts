import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';

@Component({
  standalone: true,
  imports: [AutofocusDirective],
  template: '<input appAutofocus />'
})
class TestHostComponent {}

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('focuses the host element after view init', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const focusSpy = jest.spyOn(input, 'focus');

    fixture.detectChanges();

    expect(focusSpy).toHaveBeenCalled();
  });
});
