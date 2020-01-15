import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service'
import { LoginInfo } from '../format'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo: LoginInfo;
  loginForm: FormGroup;

  constructor(private communicatorService: CommunicatorService) {
    this.loginInfo = {
      'user_id': '1',
      'pword': 'hello password'
    }
  }

  ngOnInit() {
  }

  login() {
    this.communicatorService
      .loginUser(this.loginInfo).subscribe();
    console.log("sended");
  }

  onSubmit() {

  }

}
