import { TestBed } from '@angular/core/testing';

import { FoodApiServiceService } from './food-api-service.service';

describe('FoodApiServiceService', () => {
  let service: FoodApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
