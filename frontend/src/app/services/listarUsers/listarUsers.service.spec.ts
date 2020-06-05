/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListarUsersService } from './listarUsers.service';

describe('Service: ListarUsers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListarUsersService]
    });
  });

  it('should ...', inject([ListarUsersService], (service: ListarUsersService) => {
    expect(service).toBeTruthy();
  }));
});
