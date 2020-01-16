import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event_id: number;

  constructor() { }

  ngOnInit() { }

  setEventId(event_id: number) {
    this.event_id = event_id;
  }

  showEventId() {
    console.log(this.event_id);
  }
}
