import { Component, OnInit } from '@angular/core';
import { Requirement, RequirementsService } from './requirements.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent implements OnInit {

  requirements: Requirement[] = [];
  subscription: Subscription;

  constructor(private requirementSvc: RequirementsService,
    private dataSvc: DataStorageService) { }

  ngOnInit(): void {
    this.requirements = this.requirementSvc.getRequirements();

    this.subscription = this.requirementSvc.requirementsChanged
      .subscribe(
        (requirements: Requirement[]) => {
          this.requirements = requirements;
        }
      );

    this.loadRequirements();
  }

  onEditItem(id: number) {
    this.requirementSvc.startedEditing.next(+id);
  }

  onSubmit() {
    this.dataSvc.uploadRequirements(this.requirements);
  }

  loadRequirements() {
    this.dataSvc.downloadRequirements();
  }
}
