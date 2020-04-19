import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDetails } from './user-details.model';
import { UserDetailsService } from './user-detail.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersResolverService implements Resolve<UserDetails[]> {

    constructor(private usrDtlSvc : UserDetailsService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const users = this.usrDtlSvc.getUserList();
    
        if (users.length === 0) {
          return this.usrDtlSvc.fetchUserList();
        } else {
          return users;
        }
      }
    
}
