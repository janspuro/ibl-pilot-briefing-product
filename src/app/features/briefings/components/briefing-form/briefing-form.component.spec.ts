import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BriefingFormComponent } from './briefing-form.component';
import { ReportType } from '../../enums/report-type.enum';

describe('BriefingFormComponent', () => {
  let component: BriefingFormComponent;
  let fixture: ComponentFixture<BriefingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefingFormComponent],
      providers: [
        provideAnimationsAsync(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form', () => {
    beforeEach(() => {
      const form = component.form;
      form.get('types')!.setValue([ReportType.METAR]);
      form.get('airports')!.setValue(['LKPR', 'FNLU']);
      form.get('countries')!.setValue(['SQ', 'CZ']);

      fixture.detectChanges();
    });

    it('should be valid when all values filled', async () => {
      const form = component.form;  

      expect(form.valid).toBeTruthy();
    });

    it('should be invalid when no values filled', async () => {
      const form = component.form;
      form.reset();

      fixture.detectChanges();
  
      expect(form.invalid).toBeTruthy();
    });

    it('should be valid when types and airports filled', async () => {
      const form = component.form;  
      form.get('countries')!.reset();

      fixture.detectChanges();

      expect(form.valid).toBeTruthy();
    });

    it('should be valid when types and countries filled', async () => {
      const form = component.form;  
      form.get('airports')!.reset();

      fixture.detectChanges();

      expect(form.valid).toBeTruthy();
    });

    it('should be invalid when no types selected', async () => {
      const form = component.form;
      form.get('types')?.setValue([]);

      fixture.detectChanges();
  
      expect(form.invalid).toBeTruthy();
    });

    it('should be invalid when no airports and countries filled', async () => {
      const form = component.form;
      form.get('airports')!.reset();
      form.get('countries')!.reset();

      fixture.detectChanges();
  
      expect(form.invalid).toBeTruthy();
    });

    it('should show error alert when form touched and invalid', async () => {
      const form = component.form;
      form.reset();
     
      const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
      inputElement.dispatchEvent(new Event('blur'));
      
      fixture.detectChanges();

      const alertComponent = fixture.nativeElement.querySelector('app-alert');
      expect(alertComponent).toBeTruthy();
    });

    it('submit button should be enabled when form valid', async () => {      
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBeFalsy();
    });

    it('submit button should be disabled when form invalid', async () => {
      const form = component.form;
      form.reset();

      fixture.detectChanges();

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBeTruthy();
    });
  });
});
