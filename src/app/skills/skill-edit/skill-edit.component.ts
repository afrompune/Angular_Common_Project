import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SkillsService, Skill } from '../skill.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) skillForm: NgForm;
  editMode = false;
  editedItemIndex: number;
  editedSkill: Skill;
  subscription: Subscription;

  constructor(private skillSvc: SkillsService) { }

  ngOnInit(): void {
    this.subscription = this.skillSvc.startedEditing.subscribe((id: number) => {
      this.editMode = true;
      this.editedItemIndex = id;
      this.editedSkill = this.skillSvc.getSkill(id);

      let s = this.editedSkill.asString.split(" | ");
      let technology = s[0]
      let experience = s[1];

      this.skillForm.setValue({
        technology: technology,
        experience: experience
      })

    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newSkill = new Skill(value.technology + " | " + value.experience);
    if (this.editMode) {
      this.skillSvc.updateSkill(this.editedItemIndex, newSkill);
    } else {
      this.skillSvc.addSkill(newSkill);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.skillForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.skillSvc.deleteSkill(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
