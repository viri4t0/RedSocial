import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  update(user){
    return this.http.post<any>(this.URL + '/updateUser', user);
  }
}
