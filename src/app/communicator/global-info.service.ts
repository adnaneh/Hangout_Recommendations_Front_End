import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalInfoService {
  headers: HttpHeaders;
  login_state: boolean = true;
  username: string | null = 'Tom';

  constructor() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json', //documentation: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
      'Authorization': 'Made-in-China#!@$%?',
      'user_id': '-1'
    })
  }

  login(id: string | number, username: string) {
    this.headers['user_id'] = id.toString();
    this.login_state = true;
    this.username = username;
  }

  logout() {
    this.headers['user_id'] = "-1";
    this.login_state = false;
    this.username = null;
  }
}

