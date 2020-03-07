import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../services/friends/friends.service'
@Component({
  selector: 'app-lffriends',
  templateUrl: './lffriends.component.html',
  styleUrls: ['./lffriends.component.css']
})
export class LffriendsComponent implements OnInit {

  constructor(private friendService: FriendsService) { }

  people = [];

  ngOnInit(): void {
    this.friendService.getPeople()
    .subscribe (
      res => {
        this.people = res;
        console.log(res);
      }, err => console.log(err)
    )
  }

}
