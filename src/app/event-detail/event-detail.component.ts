import { Component, OnInit, Input } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service';
import { ActivatedRoute } from '@angular/router';
import data from '../assets/99746';
import { Event } from '../format';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  inputs: ['event_id']
})
export class EventDetailComponent implements OnInit {

  event_id: number;
  event: Event;

  constructor(private _activatedRoute: ActivatedRoute, private communicatorService: CommunicatorService) {
    this.event = data;  // uncomment for offline test
  }

  ngOnInit() {
    this.event_id = this._activatedRoute.snapshot.params['id'];
    /*this.communicatorService.getEvent(this.event_id.toString())
      .subscribe(() => this.event);*/
  }   // uncomment for online situation


  showEventId() {
    console.log(this.event_id);
  }
}
