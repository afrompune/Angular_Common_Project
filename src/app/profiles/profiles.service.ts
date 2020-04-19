import { Injectable } from '@angular/core';
import { Requirement } from '../requirements/requirements.service';
import { Skill } from '../skills/skill.service';
import { Location } from '../locations/location.service';

export class Profile {
    name: string;
    contactNumber: string;
    matchingRequirement: Requirement;
    assignedTo: string;
    selected: string;
    comments: string;

    constructor(
        name: string, contactNumber: string, matchingRequirement: Requirement,
        assignedTo: string, selected: string, comments: string) {
        this.name = name;
        this.contactNumber = contactNumber;
        this.matchingRequirement = matchingRequirement;
        this.assignedTo = assignedTo;
        this.selected = selected;
        this.comments = comments;
    }
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
    profiles: Profile[] = [
        new Profile("Sanket", "992323", new Requirement(
            new Skill("Pega | 3 Years"), new Location("Chennai")),
            "a@b.com", "N/A", "N/A"),
        new Profile("Aniket", "98765", new Requirement(
            new Skill("Core Java, Spring, Hibernate | 5 years+"), new Location("Mumbai")),
            "b@c.com", "N/A", "N/A")
    ];

}