import { TestBed } from '@angular/core/testing';

import { SchoolWrapperService } from './school-wrapper.service';

describe('SchoolWrapperService', () => {
  let service: SchoolWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
