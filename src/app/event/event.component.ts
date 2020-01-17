import { Component } from '@angular/core';
//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { CommunicatorService } from '../communicator/communicator.service';
import { Event, Events } from '../format';
import data from '../assets/events_brief';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { MessageService } from '../communicator/message.service'
import { Router } from '@angular/router'

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


    constructor(private eventService: CommunicatorService, private messageService: MessageService, private router: Router) {
        this.events = data; // only for offline test
        //this.showEvents();    //uncomment for online situation
    }


    showEvents() {
        this.eventService.getEvents()
            .subscribe((data: Events) => this.events = {
                event: data['event']
            });
    }

    /** route to the Event detail page */
    viewEventDetail(id: number) {
        console.log("homepage:" + id);
        this.router.navigateByUrl('eventdetail');
        console.log("before send message")
        this.messageService.sendMessage('hello');
        console.log("after send message")
    }

    public itemsList: Object[] = [
        {
            title: 'Collapsible Group Item #1',
            description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
        },
        {
            title: 'Collapsible Group Item #2',
            description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
        },
        {
            title: 'Collapsible Group Item #3',
            description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
        }
    ];


}