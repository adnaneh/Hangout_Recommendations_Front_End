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

  //returnUrl
  response: string = '';
  loginResp: any;
  error: boolean = false;
  constructor(private communicatorService: CommunicatorService, private globalInfo: GlobalInfoService, private router: Router) { }



  ngOnInit() { }


  /* Called by Login button*/
  onSubmit(f: NgForm) {
    this.login(f.value);
  }

  /*  send login form to the server and recieve response*/
  login(f: LoginInfo) {
    //console.log(f)
    this.communicatorService.loginUser(f)
      .subscribe(resp => {
        this.loginResp = resp;
        this.processLoginResp(f.unique_key);
      },
        error => {
          this.error = true;
        }
      );
  }

  /* process the response from the server*/
  processLoginResp(username: string) {
    if (this.loginResp['login_state'] == true) {
      this.globalInfo.login(this.loginResp['user_online'], username);
      this.router.navigate(['']);
    } else {
      console.log(this.loginResp['description']);
    }
  }

}
