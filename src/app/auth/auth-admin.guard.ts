import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take, exhaustMap } from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthAdminGuard implements CanActivate {

    constructor(private authSvc: AuthService,
        private dataSvc: DataStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.authSvc.user
            .pipe(
                take(1),  //Subscribe to take only one value and unsubscribe
                exhaustMap(
                    (user) => {
                        if (!!user) {
                            console.log("AuthAdminGuard : " + this.authSvc.isUserAdmin);
                            return this.dataSvc.isUserAnAdmin(user.email);
                        }
                        else {
                            console.log("AuthAdminGuard : False");
                            return of(false);
                        }
                    }));
    }
}
