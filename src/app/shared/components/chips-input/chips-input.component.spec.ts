import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SPACE } from '@angular/cdk/keycodes';

import { ChipsInputComponent } from './chips-input.component';

describe('ChipsInputComponent', () => {
  let component: ChipsInputComponent;
  let fixture: ComponentFixture<ChipsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsInputComponent],
      providers: [
        provideAnimationsAsync(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pattern validation', () => {
    it('should accept any value when no pattern is set', async () => {
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
      inputElement.value = 'Test123*';
  
      inputElement.dispatchEvent(new KeyboardEvent('keydown', {
        keyCode: SPACE,
        ctrlKey: false,
      }));

      await fixture.whenStable();
      const value = component.value();
  
      expect(value).toHaveSize(1);
    });

    it('should accept value matching pattern', async () => {
      fixture.componentRef.setInput('chipPattern', '^[a-z0-9]+$');
      
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
      inputElement.value = 'test123';
  
      inputElement.dispatchEvent(new KeyboardEvent('keydown', {
        keyCode: SPACE,
        ctrlKey: false,
      }));

      await fixture.whenStable();
      const value = component.value();
  
      expect(value).toHaveSize(1);
    });
  
    it('should not accept value not matching pattern', async () => {
      fixture.componentRef.setInput('chipPattern', '^[a-z0-9]+$');
      await fixture.whenStable();
  
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
      inputElement.value = 'Test123';
  
      inputElement.dispatchEvent(new KeyboardEvent('keydown', {
        keyCode: SPACE,
        ctrlKey: false,
      }));

      await fixture.whenStable();
      const value = component.value();
  
      expect(value).toHaveSize(0);
    });
  });
});
