import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { BriefingsService } from './briefings.service';

describe('BriefingsService', () => {
  let service: BriefingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(BriefingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
