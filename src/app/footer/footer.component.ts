import { Component, OnInit } from '@angular/core';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  isAdminAuthenticated = false;
  isPanelistAuthenticated = false;
  user: User = null;
  subscription: Subscription;
  sessionTimer: number = 0;
  sessionTimerAsString: string = "00:00:00";
  timer: any = null;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.subscription = this.authSvc.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.isPanelistAuthenticated = !!user;
        if (!!user) {
          let eTime = user.expirationDate.getTime();
          let cTime = new Date().getTime();
          this.sessionTimer = +(((eTime - cTime) / 1000).toFixed());
          this.timer = setInterval(() => this.handleTime(), 1000);
        }
      }
    })

    this.authSvc.adminFlagchanged.subscribe((isAdmin) => {
      this.isAdminAuthenticated = isAdmin;
    });

  }

  handleTime() {
    if (this.timer && this.sessionTimer < 1) {
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
