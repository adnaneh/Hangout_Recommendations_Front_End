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

  }

  ngOnInit() {
    this.loginInfo = {
      'uname': '1',
      'pword': 'hello password'
    }
  }

  login() {
    this.communicatorService
      .loginUser(this.loginInfo).subscribe();
  }

  onSubmit() {
    this.communicatorService
      .loginUser(this.loginInfo).subscribe();
    console.log("sended");
    console.log(this.loginInfo);
  }

  getResp() {
    this.communicatorService
      .getLoginUser().subscribe();
  }

}
