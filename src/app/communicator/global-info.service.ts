import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalInfoService {
  headers: HttpHeaders;   // http headers
  login_state: boolean = false;   // login state,true user logined in
  username: string | null = null; // username

  constructor() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json', //documentation: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
      'Authorization': 'Made-in-China#!@$%?',
      'user_id': '-1'
    })
  }

  // once a user logined in, save the user's information
  login(user_id: string | number, username: string) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json', //documentation: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
      'Authorization': 'Made-in-China#!@$%?',
      'user_id': user_id.toString()
    })
    this.login_state = true;
    this.username = username;
  }

  show() {
    console.log(this.headers);
  }

  // user login out, clear the user's information
  logout() {
    this.headers['user_id'] = "-1";
    this.login_state = false;
    this.username = null;
  }
}

