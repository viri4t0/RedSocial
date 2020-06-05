import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProfileService } from '../../services/profile/profile.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    username : '',
    nombre : '',
    apellido : '',
    email : '',
    sector : '',
    aficiones : '',
    fechaNacimiento : '',
    cp : '',
    trabajo : ''
  };

  userInitial;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private toastr: ToastrService
    ) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userInitial = Object.assign({}, this.user);
  }

  discardChanges() {
    this.user = Object.assign({}, this.userInitial);
  }

  updateInfo() {
    this.profileService.update(this.user)
    .subscribe(
      res => {
        console.log("RESPUESTA", res);
        if(res.ok == true){
          localStorage.setItem('user', JSON.stringify(this.user));
          this.userInitial = Object.assign({}, this.user);
          this.toastr.success("DATOS DE USUARIO ACTUALIZADOS");
        }
      },
      err => {
        console.log(err)
        this.toastr.error(err.error.respuesta);
      }
    )
  }

}
