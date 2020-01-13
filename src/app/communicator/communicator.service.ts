import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfo } from '../format';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

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

  serverUrl = 'http://138.195.247.66:8080/';
  eventsUrl = 'api/v1.0/Events';
  loginUrl = 'api/v1.0/Users/login';
  authUrl = '';   // authentification

  /** send user's login info to the server */
  loginUser(loginInfo: LoginInfo): Observable<LoginInfo> {
    return this.http.post<LoginInfo>(this.serverUrl + this.loginUrl, loginInfo, httpOptions);
  }

  /** get status for the authentification */
  getAuth() {
  }

  getEvents() {
    return this.http.get(this.serverUrl + this.eventsUrl);
  }

  getEvent(id: string) {
    return this.http.get(this.serverUrl + this.eventsUrl + id);
  }

}
