import { OnInit, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent {

  title = 'EncryptionDecryptionSample';

  plainText: string;
  encryptText: string;
  password: string = "武汉加油";

  constructor() {

  }

  click() {
    this.plainText = "好好学习 天天向上";
    console.log(this.plainText);
    this.plainText = this.encode(this.plainText);
    console.log(this.plainText);
    this.plainText = this.decode(this.plainText);
    console.log(this.plainText);
  }

  encode(msg: string) {
    return CryptoJS.AES.encrypt(msg.trim(), this.password.trim()).toString()
  }

  decode(msg: string) {
    return CryptoJS.AES.decrypt(msg.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }

}
