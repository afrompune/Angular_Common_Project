import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

export class Skill {
    asString: string;

    constructor(skillAsString: string) {
        this.asString = skillAsString;
    }

}

@Injectable({ providedIn: 'root' })
export class SkillsService {
    skills: Skill[] = [];
    startedEditing = new Subject<number>();
    skillsChanged = new Subject<Skill[]>();

    getSkills() {
        return this.skills.slice();
    }

    getSkill(id: number) {
        return this.skills[id];
    }

    setSkills(skills: Skill[]) {
        this.skills = skills;
        this.skillsChanged.next(this.skills);
    }

    updateSkill(id: number, skill: Skill) {
        this.skills[id] = skill;
        this.skillsChanged.next(this.skills);
    }

    addSkill(skill: Skill) {
        this.skills.push(skill);
        this.skillsChanged.next(this.skills);
    }

    deleteSkill(id: number) {
        this.skills.splice(id, 1);
        this.skillsChanged.next(this.skills);
    }

}