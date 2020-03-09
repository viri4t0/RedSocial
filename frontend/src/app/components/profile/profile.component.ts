import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProfileService } from '../../services/profile/profile.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  }

  userInitial;

  constructor(
    private router: Router,
    private profileService: ProfileService
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
          console.log("ACTUALIZO LOCALSTORAGE")
          localStorage.setItem('user', JSON.stringify(this.user));
          this.userInitial = Object.assign({}, this.user);
        }
      },
      err => console.log(err)
    )
  }

}
