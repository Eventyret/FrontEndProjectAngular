import { TestBed, inject } from '@angular/core/testing';

import { ImdbExtraInfoService } from './imdb-extra-info.service';

describe('ImdbExtraInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImdbExtraInfoService]
    });
  });

  it('should be created', inject([ImdbExtraInfoService], (service: ImdbExtraInfoService) => {
    expect(service).toBeTruthy();
  }));
});
