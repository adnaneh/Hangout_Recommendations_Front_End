import { Component } from '@angular/core';
//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommunicatorService } from '../communicator/communicator.service';
import { Event, Events } from '../format';
import data from '../assets/events';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    providers: [CommunicatorService],
    styles: ['.error {color:red;}'],
    styleUrls: ['./event.component.css']
})
export class EventComponent {
    error: any;
    headers: string[];
    event: Event;
    events: Events;


    constructor(private eventService: CommunicatorService) {
        this.events = data;
    }


    showEvent(id: string) {
        this.eventService.getEvent(id)
            .subscribe((data: Event) => this.event = {
                event_id: data['event']['event_id'],
                title: data["event"]['title'],
                category: data["event"]['category'],
                price: data["event"]['price'],
                description: data["event"]['description'],
                link: data["event"]['link'],
                telephone: data["event"]['telephone'],
                tags: data["event"]['tags'],
                address_street: data["event"]['address_street'],
                address_city: data["event"]['address_city'],
                address_zipcode: data["event"]['address_zipcode'],
                date: data["event"]['date'],
                date_end: data["event"]['date_end'],
                contact_mail: data["event"]['contact_mail'],
                facebook: data["event"]['facebook'],
                website: data["event"]['website'],
                latitude: data["event"]['latitude'],
                longitude: data["event"]['longitude']
            });
    }

    showEvents() {
        this.eventService.getEvents()
            .subscribe((data: Events) => this.events = {
                event: data['event']
            });
        //console.log(this.events)
    }

}