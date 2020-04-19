import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserStartComponent } from './user/user-start/user-start.component';
import { UsersComponent } from './user/users/users.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UsersResolverService } from './user/users-resolver.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthAdminGuard } from './auth/auth-admin.guard';
import { SkillsComponent } from './skills/skills.component';
import { LocationsComponent } from './locations/locations.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { ProfilesComponent } from './profiles/profiles.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'users', component: UsersComponent,
    resolve: [UsersResolverService],
    canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      { path: '', component: UserStartComponent },
      { path: 'adduser', component: UserEditComponent },
      {
        path: 'edit/:id', component: UserEditComponent,
        resolve: [UsersResolverService]
      }
    ]
  },

  {
    path: 'skills', component: SkillsComponent,
    canActivate: [AuthGuard, AuthAdminGuard]
  },

  {
    path: 'requirements', component: RequirementsComponent,
    canActivate: [AuthGuard, AuthAdminGuard]
  },

  {
    path: 'locations', component: LocationsComponent,
    canActivate: [AuthGuard, AuthAdminGuard]
  },

  {
    path: 'profiles', component: ProfilesComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
