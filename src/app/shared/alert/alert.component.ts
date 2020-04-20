import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ApplicationEventService } from '../application-event.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
    @Input() message: string = '';
    @Output() close = new EventEmitter<void>();
    subscription: Subscription;

    constructor(private evtSvc: ApplicationEventService) { }

    onClose() {
        this.message = "";
    }

    ngOnInit() {
        this.subscription = this.evtSvc.eventGenerated.subscribe((evt) => {
            if (evt.eventType === "ForAlertComponent") {
                this.message = this.message + (this.message ? " Also " :"") + evt.eventValue;
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
