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
  loading = false;
  submitted = false;
  //returnUrl
  response: string = '';

  constructor(private communicatorService: CommunicatorService) {

  }








  ngOnInit() {
    this.loginInfo = {
      'unique_key': '1',
      'pword': 'hello password'
    }
  }

  login() {
    this.communicatorService
      .loginUser(this.loginInfo).subscribe();
  }

  onSubmit() {
    this.communicatorService
      .loginUser(this.loginInfo).subscribe(resp => console.log(resp));
  }

  getResp() {
    this.communicatorService
      .getLoginUser().subscribe();
  }

}
