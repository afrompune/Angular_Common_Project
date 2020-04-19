import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { UsersComponent } from './user/users/users.component';
import { UserStartComponent } from './user/user-start/user-start.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { UsersResolverService } from './user/users-resolver.service';
import { SkillsComponent } from './skills/skills.component';
import { SkillEditComponent } from './skills/skill-edit/skill-edit.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationEditComponent } from './locations/location-edit/location-edit.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { RequirementEditComponent } from './requirements/requirement-edit/requirement-edit.component';
import { RequirementFilterPipe } from './requirements/requirement-filter.pipe';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileEditComponent } from './profiles/profile-edit/profile-edit.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropDownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    UsersComponent,
    UserStartComponent,
    UserEditComponent,
    SkillsComponent,
    SkillEditComponent,
    LocationsComponent,
    LocationEditComponent,
    RequirementsComponent,
    RequirementEditComponent,
    RequirementFilterPipe,
    ProfilesComponent,
    ProfileEditComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
