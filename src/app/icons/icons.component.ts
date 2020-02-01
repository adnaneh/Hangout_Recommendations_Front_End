import { OnInit, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent {

  title = 'EncryptionDecryptionSample';

  plainText: any;
  encryptText: string;
  password = CryptoJS.enc.Utf8.parse("WuHan,GoodLuck!!");//KEY
  //password = CryptoJS.enc.Utf8.parse("1234567812345678");
  iv = CryptoJS.enc.Utf8.parse("+wx:lzh295256908");
  //iv = CryptoJS.enc.Utf8.parse("8765432187654321");

  constructor() {

  }

  click() {

    this.plainText = CryptoJS.enc.Utf8.parse("合肥");
    console.log("plain text : " + this.plainText);
    let encrypted = this.encode(this.plainText);
    console.log("encrypted: " + encrypted);
    this.plainText = this.decode(encrypted);



    console.log(this.plainText);
  }

  encode(msg: string) {
    return CryptoJS.AES.encrypt(msg, this.password, { iv: this.iv, mode: CryptoJS.mode.CBC, pad: CryptoJS.pad.pkcs7, asBpytes: true }).toString()
  }

  decode(msg: string) {
    return CryptoJS.AES.decrypt(msg, this.password, { iv: this.iv, mode: CryptoJS.mode.CBC, pad: CryptoJS.pad.pkcs7, asBpytes: true }).toString(CryptoJS.enc.Utf8);
  }

  stringToHex(str) {
    let val = '';
    for (let i = 0; i < str.length; i++) {
      if (val === '') {
        val = str.charCodeAt(i).toString(16);
      } else {
        val += ' ' + str.charCodeAt(i).toString(16);
      }
    }
    return val;
  }

  toUTF8Array(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
          0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode = 0x10000 + (((charcode & 0x3ff) << 10)
          | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }

}
