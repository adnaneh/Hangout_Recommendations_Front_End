import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import '../assets'
import { catchError, retry } from 'rxjs/operators';

export interface Event {
  event_id: number,
  title: string,
  category: string,
  price: string,
  description: string,
  link: string,
  telephone: string,
  tags: string,
  address_street: string,
  address_city: string,
  address_zipcode: string,
  date: string,
  date_end: string,
  contact_mail: string,
  facebook: string,
  website: string,
  latitude: number,
  longitude: number
}

export interface Events {
  event: Event[]
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  serverUrl = 'http://138.195.247.66:8080/';
  eventsUrl = 'api/v1.0/Events/';

  /*getConfig() {
    // now returns an Observable of Config
    return this.http.get<Config>(this.configUrl)
  }*/

  getEvents() {
    return this.http.get(this.serverUrl + this.eventsUrl);
  }

  getEvent(id: string) {
    return this.http.get(this.serverUrl + this.eventsUrl + id);
  }

  loginUrl = 'api/v1.0/Users/login/';

  /** send user's login info to the server */
  loginUser() {
    this.http.post(this.serverUrl + this.loginUrl, { 'user_id': "22", 'pword': 'lucky' });
  }



  /*getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      // 除了返回我所要的json 还会返回所有Observable如special headers和status code
      this.configUrl, { observe: 'response' });
  }*/

}
