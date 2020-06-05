/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrivateProfileService } from './privateProfile.service';

describe('Service: PrivateProfile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivateProfileService]
    });
  });

  it('should ...', inject([PrivateProfileService], (service: PrivateProfileService) => {
    expect(service).toBeTruthy();
  }));
});
