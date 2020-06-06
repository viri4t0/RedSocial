/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuePuedoVerService } from './quePuedoVer.service';

describe('Service: QuePuedoVer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuePuedoVerService]
    });
  });

  it('should ...', inject([QuePuedoVerService], (service: QuePuedoVerService) => {
    expect(service).toBeTruthy();
  }));
});
