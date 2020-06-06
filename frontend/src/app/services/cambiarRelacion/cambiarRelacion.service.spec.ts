/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CambiarRelacionService } from './cambiarRelacion.service';

describe('Service: CambiarRelacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CambiarRelacionService]
    });
  });

  it('should ...', inject([CambiarRelacionService], (service: CambiarRelacionService) => {
    expect(service).toBeTruthy();
  }));
});
