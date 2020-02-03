import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginInfo, Events, SignupInfo } from '../format';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GlobalInfoService } from './global-info.service'
import { AESService } from '../aes.service'


/*
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', //documentation: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
    'Authorization': 'Made-in-China#!@$%?',
    'user_id': '-1'
  })
};*/



@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CommunicatorService {

  constructor(
    private http: HttpClient,
    private globalInfo: GlobalInfoService,
    private AES: AESService
  ) { }

  // readonly url_root = 'http://10.55.154.7:8080/';
  readonly url_root = 'http://10.56.62.27:8080/';
  readonly url_api = 'api/v1.0';
  readonly serverUrl = this.url_root + this.url_api;
  readonly eventsUrl = '/Events';
  readonly loginUrl = '/Users/login';
  readonly signupUrl = '/Users/signup';
  readonly rateUrl = '/Rating';
  readonly searchUrl = '/search';


  /** send user's login info to the server */
  loginUser(loginInfo: LoginInfo): Observable<LoginInfo> {
    loginInfo = this.AES.encrypt(loginInfo);
    return this.http.post<LoginInfo>(this.serverUrl + this.loginUrl, loginInfo, { headers: this.globalInfo.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }


  /** Sign up */
  sigupUser(signupInfo: any): Observable<SignupInfo> {
    signupInfo = this.AES.encrypt(signupInfo);
    console.log(signupInfo);
    return this.http.post<any>(this.serverUrl + this.signupUrl, signupInfo, { headers: this.globalInfo.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /** rate for an event */
  sendRate(rate: number, event_id: number): Observable<any> {
    console.log(this.globalInfo.headers);
    return this.http.post<any>(this.serverUrl + this.rateUrl, { 'rate': rate, 'event_id': event_id }, { headers: this.globalInfo.headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /** request for events  */
  getEvents(event_id: string | number = null): Observable<HttpResponse<Events>> {
    if (event_id == null) {
      return this.http.get<Events>(this.serverUrl + this.eventsUrl, { headers: this.globalInfo.headers, observe: 'response' })
        .pipe(
          retry(3), // 重复尝试最多3次
          catchError(this.handleError)  //then catch the error
        );
    } else {
      //console.log(this.serverUrl + this.eventsUrl + "/" + event_id);
      return this.http.get<Events>(this.serverUrl + this.eventsUrl + "/Categories/" + event_id, { headers: this.globalInfo.headers, observe: 'response' })
        .pipe(
          retry(3), // 重复尝试最多3次
          catchError(this.handleError)
        );
    }
  }

  /** request for the detail of a single events */
  getEvent(id: string) {
    return this.http.get(this.serverUrl + this.eventsUrl + "/" + id, { headers: this.globalInfo.headers });
  }

  searchEvent(keyword: string) {
    return this.http.post(this.serverUrl + this.eventsUrl + this.searchUrl, { 'keywords': keyword }, { headers: this.globalInfo.headers })
  }

  /** Get geometry with google maps API, given the street, zipcode and city name */
  getGeometry(location: string) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyBuTCnWUH_Y6S9YpMWai7_n0PQgpMM7-Yw")
    //https://maps.googleapis.com/maps/api/geocode/json?address=1+rue+joliot+curie,+91190,+gif+sur+yvette&key=AIzaSyBuTCnWUH_Y6S9YpMWai7_n0PQgpMM7-Yw
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}



