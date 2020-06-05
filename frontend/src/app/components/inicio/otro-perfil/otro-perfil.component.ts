import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarUsersService } from '../../../services/listarUsers/listarUsers.service';
import { RelacionarUsuariosService } from '../../../services/relacionarUsuarios/relacionarUsuarios.service';

@Component({
  selector: 'app-otro-perfil',
  templateUrl: './otro-perfil.component.html',
  styleUrls: ['./otro-perfil.component.css']
})
export class OtroPerfilComponent implements OnInit {

  usuarioPrincipal;
  usuarioSeleccionado;
  listadoDeUsuarios = [{
    _id : String,
    nombre : String,
    apellido : String
  }];






  constructor(
    private router: Router,
    private listarUsersService: ListarUsersService,
    private relacionarUsuariosService : RelacionarUsuariosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.usuarioPrincipal = JSON.parse(localStorage.getItem('user'));
    this.listarUsersService.listarUsers(this.usuarioPrincipal)
    .subscribe(
      res => {
        console.log("RESPUESTA OTRO PERFIL", res);
        this.listadoDeUsuarios = res;

      },
      err => {
        console.log(err)
        this.toastr.error(err.error.respuesta);
      }
    )

  }

  onChange() {

    let usuarioEnviar = {
      user1 : String,
      user2 : String,
      status : Number,
      statusUser1 : Number,
      statusUser2 : Number,
      nombreUser1 : '',
      nombreUser2 : '',
      action_user : String,
    };

    usuarioEnviar.user2 = this.usuarioSeleccionado._id;
    usuarioEnviar.user1 = this.usuarioPrincipal._id;
    usuarioEnviar.nombreUser1 = this.usuarioPrincipal.nombre   + ' ' +  this.usuarioPrincipal.apellido;
    usuarioEnviar.nombreUser2 = this.usuarioSeleccionado.nombre + ' ' +  this.usuarioSeleccionado.apellido;

    this.relacionarUsuariosService.relacionarUsuarios(usuarioEnviar)
    .subscribe(
      res => {
        console.log("USUARIO SELECCIONADO", res);
        this.usuarioSeleccionado = res;
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.respuesta);
      }
    )
}

}
