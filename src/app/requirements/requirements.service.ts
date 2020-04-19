import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Skill } from '../skills/skill.service';
import { Location } from '../locations/location.service';

export class Requirement {
    skill: Skill;
    location: Location;

    constructor(skill: Skill, location: Location) {
        this.skill = skill;
        this.location = location;
    }
}

@Injectable({ providedIn: 'root' })
export class RequirementsService {
    requirements: Requirement[] = [];
    startedEditing = new Subject<number>();
    requirementsChanged = new Subject<Requirement[]>();

    getRequirements() {
        return this.requirements.slice();
    }

    getRequirement(id: number) {
        return this.requirements[id];
    }

    setRequirements(requirements: Requirement[]) {
        this.requirements = requirements;
        this.requirementsChanged.next(this.requirements);
    }

    updateRequirement(id: number, requirement: Requirement) {
        this.requirements[id] = requirement;
        this.requirementsChanged.next(this.requirements);
    }

    addRequirement(requirement: Requirement) {
        this.requirements.push(requirement);
        this.requirementsChanged.next(this.requirements);
    }

    deleteRequirement(id: number) {
        this.requirements.splice(id, 1);
        this.requirementsChanged.next(this.requirements);
    }

}
