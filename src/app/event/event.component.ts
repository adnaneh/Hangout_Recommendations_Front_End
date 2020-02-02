import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service';
import { Event, Events } from '../format';
import data from '../assets/events_brief';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { MessageService } from '../communicator/message.service';
import { Router } from '@angular/router';
import { Category } from '../format';
import { GlobalInfoService } from '../communicator/global-info.service'
import { NgForm, FormGroup } from '@angular/forms';
// import { mdbIcon } from 'mdbvue';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    providers: [CommunicatorService],
    styles: ['.error {color:red;}'],
    styleUrls: ['./event.component.css'],
    inputs: ['inputsValue'],
    // animations: ['handleClick']
})
export class EventComponent implements OnInit {
    error: any;
    headers: string[];
    event: Event;
    events: Events | any;
    private category: any;
    large_category: string[];
    private large_category_index = {};
    small_category: any = {};
    searchForm: FormGroup;
    items1 = [];
    pageOfEvents: Array<any>;



    constructor(private eventService: CommunicatorService, private messageService: MessageService, private router: Router, private globalInfoService: GlobalInfoService) {
        this.events = data; // only for offline test
        //this.events = { "event": [] };
        this.category = Category;
        this.large_category = Object.keys(this.category);
        this._initLargeCategoryIndex();
        this._initSmallCategory();
        this.showEvents();    //uncomment for online situation
    }
    

    ngOnInit() {

    }

    onChangePage(pageOfEvents: Array<any>) {
        // update current page of items
        this.pageOfEvents = pageOfEvents;
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

    /** search Events */
    searchEvent(msg: string) {
        //console.log(msg);
        this.eventService.searchEvent(msg)
            .subscribe(resp => {
                this.events = resp;
            })
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

    /** bind with button of search bar  */
    onSubmit(f: NgForm) {
        let info: string = "";
        info += f.value['search'];
        info += " " + f.value['date'];
        if (info.match(/^[ ]+$/)) {
            console.log("input of search bar is all space");
            return
        }
        this.searchEvent(info);
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
    handleClick() {
        console.log('clicked');
      }


}

