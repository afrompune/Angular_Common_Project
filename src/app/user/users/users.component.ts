import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-detail.service';
import { UserDetails } from '../user-details.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userDetails: UserDetails[] = [];

  constructor(private usrDtl: UserDetailsService) { }

  ngOnInit() {
    this.userDetails = this.usrDtl.getUserList();
  }

}
