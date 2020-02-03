import { OnInit, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Info } from "./shareInfo.service";




@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent {


  constructor(private info: Info) {

  }

  click() {
    this.info.increase()
  }

  show() {
    console.log(this.info.i)
    console.log(this.info.headers);
  }

}
