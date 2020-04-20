import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from './profiles.service';
import { ApplicationEventService, ApplicationEvent } from '../shared/application-event.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profiles: Profile[] = [];
  filterString = '';

  constructor(private profileSvc: ProfileService,
    private evtSvc: ApplicationEventService) { }

  ngOnInit(): void {
    this.profiles = this.profileSvc.profiles;

    this.evtSvc.generateEvent(new ApplicationEvent("ForAlertComponent", "Yet to be implemented."));
  }

}
