import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import data from '../assets/99746';
import { Event } from '../format';
import { GlobalInfoService } from '../communicator/global-info.service'

declare const $: any;
declare const google: any;

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  inputs: ['event_id']
})
export class EventDetailComponent implements OnInit, AfterViewInit {

  event_id: number;
  event: Event;
  //rate = new FormControl(null, Validators.required);


  /** Google maps module parameters */
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  map_status: boolean = false;
  lat: any = 23;   // canton tower
  lng: any = 11;
  coordinates: any;
  mapOptions: google.maps.MapOptions;
  marker: any;
  flag: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private communicatorService: CommunicatorService, private globalInfoService: GlobalInfoService) {
    this.event = data;  // uncomment for offline test
  }

  ngOnInit() {
    this.event_id = this._activatedRoute.snapshot.params['id'];
    this.communicatorService.getEvent(this.event_id.toString())
      .subscribe(resp => {
        this.event = resp['event']
      });
    this.globalInfoService.headers['user_id'] = '1';
    //console.log("header:" + this.globalInfoService.headers);
    this._initMapsPara();
  }   // uncomment for online situation

  ngAfterViewInit() {
    setTimeout(() => { this.mapInitializer(); }, 2000);
  }

  /** Functions of google map */
  async _initMapsPara() {

    /** check if the event contains geometry*/
    //console.log(this.map_status);
    if (this.event['latitude'] != "NULL" && this.event['longitude'] != "NULL") {
      this.lat = this.event['latitude'];
      this.lng = this.event['longitude'];
      this.map_status = true;
      //console.log("ok");
    }

    /** check if the event contains street name etc*/
    if (this.map_status == false) {
      let location = this.processLocationName();
      //console.log(location);
      let resp = await this.communicatorService.getGeometry(location)
        .toPromise();
      this.lat = resp['results']['0']['geometry']['location']['lat'];
      this.lng = resp['results']['0']['geometry']['location']['lng'];
      //console.log(this.lat);
      //console.log(this.lng);
      this.map_status = true;
    }

    if (!this.map_status) {
      console.log("map status die");
      return
    }
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions = {
      center: this.coordinates,
      zoom: 14
    };
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });

    this.flag = true;
    console.log("finish");
  }

  /** combine the address information into 1 string */
  processLocationName() {
    var location: string = "";
    if (this.event['address_street'] != "NULL") {
      location += this.event['address_street'];
    }

    if (this.event['address_zipcode'] != "NULL") {
      location += "," + this.event['address_zipcode'];
    }

    if (this.event['address_city'] != "NULL") {
      location += "," + this.event['address_city']
    }
    return location
  }

  /** initialize google map */
  mapInitializer() {
    if (!this.map_status) {
      console.log("maoInitializer die");
      return
    }
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.marker.setMap(this.map);
  }


  /*toggle() {
    if (this.rate.disabled) {
      this.rate.enable();
    } else {
      this.rate.disable();
    }
  }*/

  /**rate for the event */
  rate(score: number) {
    //console.log(this.globalInfoService.headers['user_id']);
    //if (this.globalInfoService.headers['user_id'] == '-1') {
    this.communicatorService.sendRate(score, Number(this.event_id)).subscribe();
    //}
  }


}
