import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UserDetailsService } from '../user-detail.service';
import { UserDetails } from '../user-details.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean;
  userDtl: UserDetails = new UserDetails('', '');
  error: string = '';
  authSubscription1: Subscription;
  authSubscription2: Subscription;

  constructor(private route: ActivatedRoute,
    private userSvc: UserDetailsService,
    private authSvc: AuthService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });


  }

  private initForm() {

    if (this.editMode) {
      this.userDtl = this.userSvc.getUserDetails(this.id);
    }

  }

  onSubmit(userForm: NgForm) {
    const userDtl = new UserDetails(userForm.value.nm_email, userForm.value.nm_user_type);
    console.log("User Edit : userDtl : " + userDtl);
    if (this.editMode) {
      this.userSvc.updateUser(this.id, userDtl);
    }
    else {
      this.authSubscription1 = this.authSvc.signup(userDtl.user_name, userForm.value.nm_password, false).subscribe(
        (response) => {
          console.log("Add User Response " + response);
          this.userSvc.addUser(userDtl);
        },
        (err) => {
          this.error = err
        }
      );

    }
  }

  ngOnDestroy() {
    if (this.authSubscription1)
      this.authSubscription1.unsubscribe();
    if (this.authSubscription2)
      this.authSubscription2.unsubscribe();
  }
}
