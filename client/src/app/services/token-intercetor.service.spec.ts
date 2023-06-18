import { TestBed } from '@angular/core/testing';

import { TokenIntercetorService } from './token-intercetor.service';

describe('TokenIntercetorService', () => {
  let service: TokenIntercetorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenIntercetorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
