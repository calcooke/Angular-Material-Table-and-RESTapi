import { TestBed } from '@angular/core/testing';

import { JobsApiService } from './jobs-api.service';

describe('JobsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobsApiService = TestBed.get(JobsApiService);
    expect(service).toBeTruthy();
  });
});
