import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient) { }

    fetchAllUserDetails() {
        return this.http.get(
            environment.userDataUrl + ".json"
        );
    }

    storeUser(user_name: string, user_type: string) {
        return this.http.put(
            environment.userDataUrl + "/" + this.formatUserName(user_name) + ".json",
            {
                'user_name': user_name,
                'user_type': user_type
            }
        )
            .subscribe(
                () => { return "OK"; },
                error => { console.log(error); }
            )

    }

    isUserAnAdmin(user_name: string) {
        return this.http.get(
            environment.userDataUrl + "/" + this.formatUserName(user_name) + ".json"
        )
    }

    formatUserName(user_name: string) {
        return user_name.replace("@", "").replace(".", "").toLowerCase();
    }
}
