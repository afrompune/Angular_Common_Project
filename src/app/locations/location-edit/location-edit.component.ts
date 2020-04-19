import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LocationsService, Location } from '../location.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  @ViewChild('f', { static: false }) locationForm: NgForm;
  editMode = false;
  editedItemIndex: number;
  editedLocation: Location;
  subscription: Subscription;

  constructor(private locationSvc: LocationsService) { }

  ngOnInit(): void {
    this.subscription = this.locationSvc.startedEditing.subscribe((id: number) => {
      this.editMode = true;
      this.editedItemIndex = id;
      this.editedLocation = this.locationSvc.getLocation(id);

      this.locationForm.setValue({
        location_name: this.editedLocation.name
      })

    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newLocation = new Location(value.location_name);
    if (this.editMode) {
      this.locationSvc.updateLocation(this.editedItemIndex, newLocation);
    } else {
      this.locationSvc.addLocation(newLocation);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.locationForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.locationSvc.deleteLocation(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
