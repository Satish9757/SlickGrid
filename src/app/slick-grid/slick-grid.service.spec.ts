import { TestBed } from '@angular/core/testing';

import { SlickGridService } from './slick-grid.service';

describe('SlickGridService', () => {
  let service: SlickGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlickGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
