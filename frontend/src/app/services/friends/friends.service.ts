import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPeople(user){
    return this.http.post<any>(this.URL + '/listusers',user);
  }
}
