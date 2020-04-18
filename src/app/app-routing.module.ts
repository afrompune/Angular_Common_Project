import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserStartComponent } from './user/user-start/user-start.component';
import { UsersComponent } from './user/users/users.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'users', component: UsersComponent,
    children: [
      { path: '', component: UserStartComponent },
      { path: 'adduser', component: UserEditComponent },
      { path: 'edit/:id', component: UserEditComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
