import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

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
    email : ''
  }

  userInitial;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = history.state.data;
    this.userInitial = Object.assign({}, this.user);
  }

  discardChanges() {
    this.user= Object.assign({}, this.userInitial);
  }

  updateInfo() {
    
  }

}
