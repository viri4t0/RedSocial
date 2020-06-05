import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListarUsersService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  listarUsers(user){
    return this.http.post<any>(this.URL + '/listarUsers',user);
  }
}

