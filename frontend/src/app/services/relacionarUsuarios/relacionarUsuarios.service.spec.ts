/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RelacionarUsuariosService } from './relacionarUsuarios.service';

describe('Service: RelacionarUsuarios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelacionarUsuariosService]
    });
  });

  it('should ...', inject([RelacionarUsuariosService], (service: RelacionarUsuariosService) => {
    expect(service).toBeTruthy();
  }));
});
