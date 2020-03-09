import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    username : '',
    nombre : '',
    apellido : '',
    email : '',
    password : ''
  }

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  signUp() {
    this.authService.signUp(this.user)
    .subscribe(
      res => {
        console.log(res);
        this.toastr.success("REGISTRADO CORRECTAMENTE");
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.err.message);
      }
    )
  }

}
