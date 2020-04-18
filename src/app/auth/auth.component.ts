import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authSvc: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    this.error = null;

    const email = authForm.value.nm_email;
    const password = authForm.value['nm_password'];

    if (authForm.valid) {
      this.isLoading = true;
    }

    let authObs: Observable<AuthResponseData>;

    if (!this.isLoginMode && authForm.valid) {
      console.log("Signing up");
      //Signup
      authObs = this.authSvc.signup(email, password);
    }
    else if (authForm.valid) {
      //Login
      authObs = this.authSvc.login(email, password)
    }

    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      errMsg => {
        this.error = errMsg;
        this.isLoading = false;
      }
    );
    authForm.reset();
  }

  ngOnDestroy() { }

}
