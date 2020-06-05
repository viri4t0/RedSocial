import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrivateProfileService } from '../../../services/privateProfile/privateProfile.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  postPublicSelected: boolean;
  postConocidoSelected: boolean;
  postAmigoSelected: boolean;

  user = {
    username : '',
    nombre : '',
    apellido : '',
    email : '',
    perfil : '',
    sector : '',
    aficiones : '',
    fechaNacimiento : '',
    cp : '',
    trabajo : '',
    perfilPublico : {
      empresa : false,
      sector : false,
      zona : false,
      noZona : false
    },
    puedeVerPublico : {
      correo : false,
      sector : false,
      aficiones : false,
      edad : false,
      cp : false,
      trabajo : false
    },
    puedeVerConocido : {
      correo : false,
      sector : false,
      aficiones : false,
      edad : false,
      cp : false,
      trabajo : false
    },
    puedeVerAmigo : {
      correo : false,
      sector : false,
      aficiones : false,
      edad : false,
      cp : false,
      trabajo : false
    },
    postPublic : {
      empresa : false,
      sector : false,
      zona : false,
      noZona : false,
    },
    postConocido : {
      empresa : false,
      sector : false,
      zona : false,
      noZona : false,
    },
    postAmigo : {
      empresa : false,
      sector : false,
      zona : false,
      noZona : false,
    }
  };

  userInitial;

  constructor(
    private router: Router,
    private privateProfileService: PrivateProfileService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userInitial = Object.assign({}, this.user);
  }

  onSubmit(): void {
    this.privateProfileService.update(this.user)
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
