import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserDetails } from './user-details.model';

@Injectable({ providedIn: 'root' })
export class UserDetailsService {
    usersChanged = new Subject<UserDetails[]>();

    private users_list: UserDetails[] = [
        new UserDetails('abhaykumar.lodha@morganstanley.com', 'Admin')
    ];

    constructor() { }

    getUserList() { return this.users_list.slice(); }

    addUser(user_name: string, user_type: string) {
        const user = new UserDetails(user_name, user_type);
        this.users_list.push(user);
        this.usersChanged.next(this.users_list.slice());
    }

}
