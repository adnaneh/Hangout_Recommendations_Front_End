import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Info {
    public headers: HttpHeaders;   // http headers
    login_state: boolean = false;   // login state,true user logined in
    username: string | null = null; // username
    public i: number = 1;

    constructor() {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json', //documentation: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
            'Authorization': 'Made-in-China#!@$%?',
            'user_id': '-1'
        })
    }

    increase() {
        this.i = this.i + 1
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json', //documentation: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
            'Authorization': 'Made-in-China#!@$%?',
            'user_id': this.i.toString()
        })
    }
}

