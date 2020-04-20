import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export class ApplicationEvent {
    eventType: string;
    eventValue: any;

    constructor(eventType: string, eventValue: any) {
        this.eventType = eventType;
        this.eventValue = eventValue;
    }

}

@Injectable({ providedIn: 'root' })
export class ApplicationEventService {
    eventGenerated = new Subject<ApplicationEvent>();

    generateEvent(evt: ApplicationEvent) {
        this.eventGenerated.next(evt);
        console.log("eventGenerated. Here.");
    }
}
