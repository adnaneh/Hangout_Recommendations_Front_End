import { Component, OnInit } from '@angular/core';
import { city_name } from '../format'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  cities_name: string[];


  constructor() {
    this.cities_name = city_name;
  }

  ngOnInit() {
  }

}
