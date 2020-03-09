import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  signIn(){
    console.log("click");
    this.authService.signIn(this.user)
    .subscribe(
      res => {
        console.log(res['ok'], res['usuario'] ,res['token']);
        localStorage.setItem('token', res['token']);
        localStorage.setItem('user', JSON.stringify(res['usuario']));
        this.router.navigate(['/profile']);
      },
      err => console.log(err)
    )
  }

}
