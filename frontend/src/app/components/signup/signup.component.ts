import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    nombre : '',
    apellido : '',
    email : '',
    password : ''
  }

  registered = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp() {
    this.authService.signUp(this.user)
    .subscribe(
      res => {
        console.log(res)
        this.registered = true
      },
      err => console.log(err)
    )
  }

}
