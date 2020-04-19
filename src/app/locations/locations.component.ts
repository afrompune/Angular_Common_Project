import { Component, OnInit } from '@angular/core';
import { LocationsService, Location } from './location.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations: Location[] = [];
  subscription: Subscription;

  constructor(private locationSvc: LocationsService,
    private dataSvc: DataStorageService) { }

  ngOnInit(): void {
    this.locations = this.locationSvc.getLocations();

    this.subscription = this.locationSvc.locationsChanged
      .subscribe(
        (locations: Location[]) => {
          this.locations = locations;
        }
      );

    this.loadLocations();
  }

  onEditItem(id: number) {
    this.locationSvc.startedEditing.next(+id);
  }

  onSubmit() {
    this.dataSvc.uploadLocations(this.locations);
  }

  loadLocations() {
    this.dataSvc.downloadLocations();
  }
}
