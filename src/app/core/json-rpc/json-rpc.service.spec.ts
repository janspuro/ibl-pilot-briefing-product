import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { JsonRpcService } from './json-rpc.service';

describe('JsonRpcService', () => {
  let service: JsonRpcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(JsonRpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
