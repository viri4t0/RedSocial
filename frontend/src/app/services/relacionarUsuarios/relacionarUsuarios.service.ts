import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelacionarUsuariosService {

private URL = 'http://localhost:3000'

constructor(private http: HttpClient) { }

relacionarUsuarios(relacion){
  return this.http.post<any>(this.URL + '/relacionarUsuarios', relacion);
}

}






