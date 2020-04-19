import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from './profiles.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profiles: Profile[] = [];

  constructor(private profileSvc: ProfileService) { }

  ngOnInit(): void {
    this.profiles = this.profileSvc.profiles;
  }

}
