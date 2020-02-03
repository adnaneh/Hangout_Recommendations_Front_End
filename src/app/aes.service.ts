import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ElementFinder } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AESService {

  /** password for encrypt and decrypt, means <Bon courage, Wuhan> */
  plainText: any;
  encryptText: string;
  password = CryptoJS.enc.Utf8.parse("WuHan,GoodLuck!!");//KEY
  //password = CryptoJS.enc.Utf8.parse("1234567812345678");
  iv = CryptoJS.enc.Utf8.parse("+wx:lzh295256908"); // WeChat account of the database's developper LI Zhihao, this is a secret!>-< 

  /** encoding function, input can be string,number or dictionary */
  encrypt(msg: string | object | number) {
    if (typeof msg === 'string') {
      return this.encode(msg)
    } else if (typeof msg === 'number') {
      return this.encode(msg.toString())
    }
    else if (typeof msg === 'object') {
      let msg_encoded: object = {};
      for (const key in msg) {
        if (msg.hasOwnProperty(key)) {
          msg_encoded[key] = this.encode(msg[key].toString())
        }
      }
      return msg_encoded
    }
  }

  /** given a string, return the encrypted string */
  encode(msg: string) {
    return CryptoJS.AES.encrypt(msg, this.password, { iv: this.iv, mode: CryptoJS.mode.CBC, pad: CryptoJS.pad.pkcs7, asBpytes: true }).toString()
  }

  /** given a encrypted string, return the original string */
  decode(msg: string) {
    return CryptoJS.AES.decrypt(msg, this.password, { iv: this.iv, mode: CryptoJS.mode.CBC, pad: CryptoJS.pad.pkcs7, asBpytes: true }).toString(CryptoJS.enc.Utf8);
  }

}
