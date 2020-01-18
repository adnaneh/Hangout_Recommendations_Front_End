import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginInfo } from '../format';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Events } from '../format'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CommunicatorService {

  constructor(private http: HttpClient) { }

  url_root = 'http://138.195.247.60:8080';
  url_api = '/api/v1.0';
  serverUrl = this.url_root + this.url_api;
  //serverUrl = 'localhost:4200/user';
  eventsUrl = '/Events';
  loginUrl = '/Users/login';
  authUrl = '';   // authentification

  /** send user's login info to the server */
  loginUser(loginInfo: LoginInfo): Observable<LoginInfo> {
    return this.http.post<LoginInfo>(this.serverUrl + this.loginUrl, loginInfo, httpOptions);
    //return this.http.put<LoginInfo>(this.serverUrl, loginInfo, httpOptions);
  }

  getLoginUser() {
    return this.http.get(this.serverUrl + this.loginUrl);
  }

  /** get status for the authentification */
  getAuth() {
  }

  /** request for events  */
  getEvents(event_id: string | number = null): Observable<HttpResponse<Events>> {
    if (event_id == null) {
      return this.http.get<Events>(this.serverUrl + this.eventsUrl, { observe: 'response' });
    } else {
      //console.log(this.serverUrl + this.eventsUrl + "/" + event_id);
      return this.http.get<Events>(this.serverUrl + this.eventsUrl + "/" + event_id, { observe: 'response' });
    }
  }

  /** request for the detail of a single events */
  getEvent(id: string) {
    return this.http.get(this.serverUrl + this.eventsUrl + id);
  }

}
