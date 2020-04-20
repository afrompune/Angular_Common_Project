import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Requirement, RequirementsService } from '../requirements.service';
import { Skill, SkillsService } from 'src/app/skills/skill.service';
import { Location, LocationsService } from 'src/app/locations/location.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-requirement-edit',
  templateUrl: './requirement-edit.component.html',
  styleUrls: ['./requirement-edit.component.css']
})
export class RequirementEditComponent implements OnInit, OnDestroy {
  skills: Skill[] = [];
  locations: Location[] = [];
  requirements: Requirement[] = [];
  subscriptionSkill: Subscription;
  subscriptionLocation: Subscription;
  // subscriptionRequirement: Subscription;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  @ViewChild('f', { static: false }) requirementForm: NgForm;

  blankRequirement = new Requirement(
    new Skill("Select skill"),
    new Location("Select Location")
  );
  selectedRequirement = this.blankRequirement;

  constructor(private locationSvc: LocationsService,
    private skillSvc: SkillsService,
    private requirementSvc: RequirementsService,
    private dataSvc: DataStorageService) { }

  ngOnInit(): void {

    this.loadSkills();
    this.loadLocations();
    //this.loadRequirements();
    this.subscription = this.requirementSvc.startedEditing.subscribe((id: number) => {
      this.editedItemIndex = +id;
      this.selectedRequirement = this.requirementSvc.getRequirement(id);
      this.editMode = true;
    });

  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newRequirement = new Requirement(
      new Skill(value.nm_skill),
      new Location(value.nm_location));

    if (this.editMode) {
      this.requirementSvc.updateRequirement(this.editedItemIndex, newRequirement);
    } else {
      this.requirementSvc.addRequirement(newRequirement);
    }
    this.editMode = false;
    form.reset();
  }

  loadSkills() {

    this.dataSvc.downloadSkills();
    this.skills = this.skillSvc.getSkills();
    //this.skills.push(this.selectedRequirement.skill);

    this.subscriptionSkill = this.skillSvc.skillsChanged
      .subscribe(
        (skills: Skill[]) => {
          this.skills = skills;
          //this.skills.push(this.selectedRequirement.skill);
        }
      );

  }

  loadLocations() {

    this.dataSvc.downloadLocations();
    this.locations = this.locationSvc.getLocations();
    //this.locations.push(this.selectedRequirement.location);

    this.subscriptionLocation = this.locationSvc.locationsChanged
      .subscribe(
        (locations: Location[]) => {
          this.locations = locations;
          //this.locations.push(this.selectedRequirement.location);
        }
      );

  }

  // loadRequirements() {

  //   this.dataSvc.downloadRequirements();
  //   this.requirements = this.requirementSvc.getRequirements();
  //   //this.requirements.push(this.selectedRequirement);

  //   this.subscriptionRequirement = this.requirementSvc.requirementsChanged
  //     .subscribe(
  //       (requirements: Requirement[]) => {
  //         this.requirements = requirements;
  //         //this.requirements.push(this.selectedRequirement);
  //       }
  //     );

  // }

  onClear() {
    this.requirementForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.requirementSvc.deleteRequirement(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    if (this.subscriptionSkill)
      this.subscriptionSkill.unsubscribe();
    if (this.subscriptionLocation)
      this.subscriptionLocation.unsubscribe();
    // if (this.subscriptionRequirement)
    //   this.subscriptionRequirement.unsubscribe();
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
