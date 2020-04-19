import { Subject, Subscription } from 'rxjs';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { UserDetails } from './user-details.model';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserDetailsService {
    usersChanged = new Subject<UserDetails[]>();

    private users_list: UserDetails[] = [];

    constructor(private dataSvc: DataStorageService) {}

    getUserList() {
        return this.users_list.slice();
    }

    fetchUserList() {
        return this.dataSvc.fetchAllUserDetails()
            .pipe(
                map(
                    (response) => {
                        let users_list: UserDetails[] = [];
                        for (var k in response) {
                            users_list.push(
                                new UserDetails(response[k]['user_name'], response[k]['user_type'])
                            );
                        }
                        return users_list;
                    }
                ),
                tap(users_list => {
                    this.users_list = users_list;
                })
            );
    }

    getUserDetails(id: number) {
        return this.users_list[id];
    }

    addUser(userDtl: UserDetails) {
        this.users_list.push(userDtl);
        this.usersChanged.next(this.users_list.slice());
        this.dataSvc.storeUser(userDtl.user_name, userDtl.user_type);
    }

    updateUser(id: number, userDtl: UserDetails) {
        this.users_list[id] = userDtl;
        this.usersChanged.next(this.users_list.slice());
        this.dataSvc.storeUser(userDtl.user_name, userDtl.user_type);
    }
}
