import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../../services/friends/friends.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  relaciones = [];
  user;

  constructor(
    private router: Router,
    private friendsService: FriendsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.friendsService.getPeople(this.user)
    .subscribe(
      res => {
        console.log("RESPUESTA", res);
        this.relaciones = res;
        localStorage.setItem('relaciones', JSON.stringify(res));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.respuesta);
      }
    )
  }



}
