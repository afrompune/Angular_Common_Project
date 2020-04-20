import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { DataStorageService } from '../shared/data-storage.service';
import { ApplicationEventService, ApplicationEvent } from '../shared/application-event.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;

  constructor(private authSvc: AuthService,
    private router: Router,
    private dataSvc: DataStorageService,
    private evtSvc: ApplicationEventService) { }

  onSwitchMode() {
    if (this.isLoginMode) {
      this.evtSvc.generateEvent(new ApplicationEvent("ForAlertComponent", "Can't Signup. Please use Login mode or contact Administrator to get registered."));
      //this.isLoginMode = !this.isLoginMode;
    }
  }

  onSubmit(authForm: NgForm) {
    if (!this.isLoginMode) {
      return;
    }
    const email = authForm.value.nm_email;
    const password = authForm.value['nm_password'];

    if (authForm.valid) {
      this.isLoading = true;
    }

    let authObs: Observable<AuthResponseData>;

    if (!this.isLoginMode && authForm.valid) {
      //Signup
      authObs = this.authSvc.signup(email, password, true);
    }
    else if (authForm.valid) {
      //Login
      authObs = this.authSvc.login(email, password)
    }

    authObs.subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(["/"]);
        this.dataSvc.isUserAnAdmin(email).subscribe(
          response => {
            this.authSvc.setIsAdmin(response);
          }
        );
      },
      errMsg => {
        this.evtSvc.generateEvent(new ApplicationEvent("ForAlertComponent", errMsg));
        this.isLoading = false;
      }
    );
    authForm.reset();
  }

  ngOnDestroy() { }

}
