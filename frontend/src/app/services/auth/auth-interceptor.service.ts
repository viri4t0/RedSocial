import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  
  constructor(private authService : AuthService) { }

  intercept(req, next){
    console.log(req);
    const tokenizeReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${this.authService.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  }

}
