import { Subject, Subscription } from 'rxjs';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { UserDetails } from './user-details.model';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class UserDetailsService {
    usersChanged = new Subject<UserDetails[]>();

    private users_list: UserDetails[] = [
        new UserDetails('abhaykumar.lodha@morganstanley.com', 'Admin')
    ];

    constructor(private dataSvc: DataStorageService) {
        console.log("DataStorageService Initialized");
    }

    getUserList() {

        this.dataSvc.fetchAllUserDetails().subscribe((response) => {
            this.users_list = [];
            for (var k in response) {
                this.users_list.push(
                    new UserDetails(response[k]['user_name'], response[k]['user_type'])
                );
            }

            this.usersChanged.next(this.users_list.slice());

        });

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
