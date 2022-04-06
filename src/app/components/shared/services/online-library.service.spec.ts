import { TestBed } from '@angular/core/testing';

import { OnlineLibraryService } from './online-library.service';

describe('OnlineLibraryService', () => {
  let service: OnlineLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
