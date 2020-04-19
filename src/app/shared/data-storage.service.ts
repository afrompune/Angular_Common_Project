import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Skill, SkillsService } from '../skills/skill.service';
import { LocationsService, Location } from '../locations/location.service';
import { Requirement, RequirementsService } from '../requirements/requirements.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient,
        private skillSvc: SkillsService,
        private locationSvc: LocationsService,
        private requirementSvc: RequirementsService,
    ) { }

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
        ).subscribe(
            () => { return "OK"; },
            error => { console.log(error); }
        )

    }

    isUserAnAdmin(user_name: string) {
        return this.http.get(
            environment.userDataUrl + "/" + this.formatUserName(user_name) + ".json"
        ).pipe(
            map((response) => response['user_type'] === 'Admin')
        )
    }

    formatUserName(user_name: string) {
        return user_name.replace("@", "").replace(".", "").toLowerCase();
    }

    uploadSkills(skills: Skill[]) {
        this.http.put(
            environment.skillsDataUrl + ".json",
            skills
        ).subscribe();
    }

    downloadSkills() {
        this.http.get<Skill[]>(
            environment.skillsDataUrl + ".json"
        ).pipe(map((skills) => {
            return (!skills) ? [] : skills
        }))
            .subscribe((skills) => {
                this.skillSvc.setSkills(skills);
            }
            );
    }

    uploadLocations(locations: Location[]) {
        this.http.put(
            environment.locationsDataUrl + ".json",
            locations
        ).subscribe();
    }

    downloadLocations() {
        this.http.get<Location[]>(
            environment.locationsDataUrl + ".json"
        ).pipe(map((locations) => {
            return (!locations) ? [] : locations
        }))
            .subscribe((locations) => {
                this.locationSvc.setLocations(locations);
            }
            );
    }

    uploadRequirements(requirements: Requirement[]) {
        this.http.put(
            environment.requirementsDataUrl + ".json",
            requirements
        ).subscribe();
    }

    downloadRequirements() {
        this.http.get<Requirement[]>(
            environment.requirementsDataUrl + ".json"
        ).pipe(map((requirements) => {
            return (!requirements) ? [] : requirements
        }))
            .subscribe((requirements) => {
                this.requirementSvc.setRequirements(requirements);
            }
            );
    }


}
