import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ElementFinder } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AESService {

  /** password for encrypt and decrypt, means <Bon courage, Wuhan> */
  password: string = "武汉加油";

  /** encoding function, input can be string,number or dictionary */
  encrypt(msg: string | object | number) {
    if (typeof msg === 'string') {
      return CryptoJS.AES.encrypt(msg.trim(), this.password.trim()).toString()
    } else if (typeof msg === 'number') {
      return CryptoJS.AES.encrypt(msg.toString().trim(), this.password.trim()).toString()
    }
    else if (typeof msg === 'object') {
      let msg_encoded: object = {};
      for (const key in msg) {
        if (msg.hasOwnProperty(key)) {
          msg_encoded[key] = CryptoJS.AES.encrypt(msg[key].toString().trim(), this.password.trim()).toString();
        }
      }
      return msg_encoded
    }
  }

  

  decrypt(msg: string) {
    return CryptoJS.AES.decrypt(msg.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }

}
