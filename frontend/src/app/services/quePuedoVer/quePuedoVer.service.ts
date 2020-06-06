import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuePuedoVerService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  quePuedoVer(user){
    return this.http.post<any>(this.URL + '/quePuedoVer',user);
  }
}
