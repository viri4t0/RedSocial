import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CambiarRelacionService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  cambiarRelacion(user){
    return this.http.post<any>(this.URL + '/cambiarRelacion',user);
  }
}
