import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

export class Location {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

@Injectable({ providedIn: 'root' })
export class LocationsService {
    locations: Location[] = [];
    startedEditing = new Subject<number>();
    locationsChanged = new Subject<Location[]>();

    getLocations() {
        return this.locations.slice();
    }

    getLocation(id: number) {
        return this.locations[id];
    }

    setLocations(locations: Location[]) {
        this.locations = locations;
        this.locationsChanged.next(this.locations);
    }

    updateLocation(id: number, location: Location) {
        this.locations[id] = location;
        this.locationsChanged.next(this.locations);
    }

    addLocation(location: Location) {
        this.locations.push(location);
        this.locationsChanged.next(this.locations);
    }

    deleteLocation(id: number) {
        this.locations.splice(id, 1);
        this.locationsChanged.next(this.locations);
    }

}