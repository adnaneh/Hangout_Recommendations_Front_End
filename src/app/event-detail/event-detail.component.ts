import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../communicator/message.service';
import { Subscription } from 'rxjs';
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

  constructor(private _activatedRoute: ActivatedRoute) {
    this.event = data;
  }

  ngOnInit() {
    this.event_id = this._activatedRoute.snapshot.params['id'];
  }

  showEventId() {
    console.log(this.event_id);
  }
}
