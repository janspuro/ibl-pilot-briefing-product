import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BriefingsComponent } from './briefings.component';

describe('BriefingsComponent', () => {
  let component: BriefingsComponent;
  let fixture: ComponentFixture<BriefingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefingsComponent],
      providers: [
        provideHttpClient(),
        provideAnimationsAsync(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
