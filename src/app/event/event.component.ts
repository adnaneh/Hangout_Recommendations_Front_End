import { Component } from '@angular/core';
//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { CommunicatorService } from '../communicator/communicator.service';
import { Event, Events } from '../format';
import data from '../assets/events_brief';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { MessageService } from '../communicator/message.service';
import { Router } from '@angular/router';
import { Category } from '../format';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    providers: [CommunicatorService],
    styles: ['.error {color:red;}'],
    styleUrls: ['./event.component.css'],
    inputs: ['inputsValue']
})
export class EventComponent {
    error: any;
    headers: string[];
    event: Event;
    events: Events;
    private category: any;
    large_category: string[];
    private large_category_index = {};
    small_category: any = {};


    constructor(private eventService: CommunicatorService, private messageService: MessageService, private router: Router) {
        this.events = data; // only for offline test
        this.category = Category;
        this.large_category = Object.keys(this.category);
        this._initLargeCategoryIndex();
        this._initSmallCategory();
        //console.log(this.large_category);
        //this.showEvents();    //uncomment for online situation

    }

    /* show events without indicating a specific category*/
    showEvents() {
        this.eventService.getEvents()
            .subscribe((data: Events) => this.events = {
                event: data['event']
            });
    }

    /** get events from server by indicating a specific category */
    getEvents(i: string, j: string = "Null") {
        if (j == 'Null') {
            //console.log(this.large_category_index[i]);
            this.eventService.getEvents(this.large_category_index[i])
                .subscribe((data: Events) => this.events = {
                    event: data['event']
                });
        } else {
            //console.log(this.category[i][j])
            this.eventService.getEvents(this.category[i][j])
                .subscribe((data: Events) => this.events = {
                    event: data['event']
                });
        }
    }

    /** route to the Event detail page */
    viewEventDetail(id: number) {
        console.log("homepage:" + id);
        this.router.navigateByUrl('eventdetail');
        console.log("before send message")
        this.messageService.sendMessage('hello');
        console.log("after send message")
    }



    private _initSmallCategory() {
        for (let key of this.large_category) {
            this.small_category[key] = Object.keys(this.category[key]);
        }
    }

    private _initLargeCategoryIndex() {
        var i = 1;
        for (let category of this.large_category) {
            this.large_category_index[category] = i;
            i++;
        }
    }


}