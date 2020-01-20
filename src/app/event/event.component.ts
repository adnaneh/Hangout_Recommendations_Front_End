import { Component } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service';
import { Event, Events } from '../format';
import data from '../assets/events_brief';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { MessageService } from '../communicator/message.service';
import { Router } from '@angular/router';
import { Category } from '../format';
import { GlobalInfoService } from '../communicator/global-info.service'

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


    constructor(private eventService: CommunicatorService, private messageService: MessageService, private router: Router, private globalInfoService: GlobalInfoService) {
        this.events = data; // only for offline test
        this.category = Category;
        this.large_category = Object.keys(this.category);
        this._initLargeCategoryIndex();
        this._initSmallCategory();
        this.showEvents();    //uncomment for online situation

    }

    /* send request for a list of events to the server */
    sendEventsRequest(events_id = null) {
        this.eventService.getEvents(events_id)
            // resp is of type 'HttpResponse<Events>' 
            .subscribe(resp => {
                // display its headers
                const keys = resp.headers.keys();
                this.headers = keys.map(key =>
                    '${key}: ${resp.headers.get(key)}');

                //access the body directly, which is typed as 'Events'
                this.events = { ...resp.body };
            }, // success path

                error => this.error = error // error path
            );
    }

    /* show events without indicating a specific category*/
    showEvents() {
        this.sendEventsRequest();
    }

    /** get events from server by indicating a specific category */
    getEvents(i: string, j: string = "Null") {
        if (j == 'Null') {
            //console.log(this.large_category_index[i]);
            this.sendEventsRequest(this.large_category_index[i]);
        } else {
            //console.log(this.category[i][j])
            this.sendEventsRequest(this.category[i][j]);
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