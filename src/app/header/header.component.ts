import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isAdminAuthenticated = false;
  isPanelistAuthenticated = false;
  subscription: Subscription;
  sessionTimer: number = 0;
  sessionTimerAsString: string = "00:00:00";
  timer: any = null;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.subscription = this.authSvc.user.subscribe(user => {
      this.isPanelistAuthenticated = !!user;
      if (!!user) {
        let eTime = user.expirationDate.getTime();
        let cTime = new Date().getTime();
        this.sessionTimer = +(((eTime - cTime) / 1000).toFixed());
        this.timer = setInterval(() => this.handleTime(), 1000);
      }
    })

    this.isAdminAuthenticated = localStorage.getItem('isAdmin') === "True";
    console.log("Header Subscribed to adminFlagchanged");
    this.authSvc.adminFlagchanged.subscribe((isAdmin) => {
      console.log("Header : Received isAdmin " + isAdmin);
      this.isAdminAuthenticated = isAdmin;
    });

  }

  handleTime() {
    if (this.timer && this.sessionTimer < 1) {
      console.log("Stopping timer now.");
      clearInterval(this.timer);
      return;
    }
    this.sessionTimer = this.sessionTimer - 1;
    this.sessionTimerAsString = this.formatTime(this.sessionTimer);
  }

  formatTime(sessionTimer: number) {
    const ss = (this.sessionTimer % 60);
    const mm = ((this.sessionTimer - ss) % 3600) / 60;
    const hh = (this.sessionTimer - (mm * 60) - ss) / 3600;

    return ((hh < 10) ? "0" + hh : hh) + ":" +
      ((mm < 10) ? "0" + mm : mm) + ":" +
      ((ss < 10) ? "0" + ss : ss);
  }

  onLogout() {
    this.authSvc.logout();
  }

}
