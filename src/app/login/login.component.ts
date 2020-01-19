import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service'
import { LoginInfo, LoginResp } from '../format'
import { NgForm, FormGroup } from '@angular/forms';
import { GlobalInfoService } from '../communicator/global-info.service';
import { Router } from '@angular/router';


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
  loginResp: any;

  constructor(private communicatorService: CommunicatorService, private globalInfo: GlobalInfoService, private router: Router) { }



  ngOnInit() {
    /*this.loginInfo = {
      'unique_key': '1',
      'pword': 'hello password'
    }*/
  }



  onSubmit(f: LoginInfo) {
    this.login(f);
    console.log(f);  // { first: '', last: '' }
  }

  login(f: LoginInfo) {
    this.communicatorService.loginUser(f)
      .subscribe(resp => {
        this.loginResp = resp;
        console.log(this.loginResp)
      });

    if (this.loginResp['state'] == true) {
      this.globalInfo.login(this.loginResp['user_online']);
      this.router.navigate(['']);
    } else {
      console.log(this.loginResp['description']);
    }
  }

}
