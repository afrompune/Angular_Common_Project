import { Component, OnInit } from '@angular/core';
import { SkillsService, Skill } from './skill.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {

  skills: Skill[] = [];
  subscription: Subscription;

  constructor(private skillSvc: SkillsService,
    private dataSvc: DataStorageService) { }

  ngOnInit(): void {
    this.skills = this.skillSvc.getSkills();

    this.subscription = this.skillSvc.skillsChanged
      .subscribe(
        (skills: Skill[]) => {
          this.skills = skills;
        }
      );

    this.loadSkills();
  }

  onEditItem(id: number) {
    this.skillSvc.startedEditing.next(+id);
  }

  onSubmit() {
    this.dataSvc.uploadSkills(this.skills);
  }

  loadSkills() {
    this.dataSvc.downloadSkills();
  }
}
