import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service'
import { LoginInfo, LoginResp } from '../format'
import { NgForm, FormGroup } from '@angular/forms';
import { GlobalInfoService } from '../communicator/global-info.service';
import { Router } from '@angular/router';
import { Info } from "../icons/shareInfo.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['/login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo: LoginInfo;
  loginForm: FormGroup;

  //returnUrl
  response: string = '';
  loginResp: any;
  error: boolean = false;
  constructor(private communicatorService: CommunicatorService,
    private globalInfo: GlobalInfoService,
    private router: Router,
    private info: Info,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }



  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }


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
        this.processLoginResp(resp);
      },
        error => {
          this.error = true;
        }
      );
  }

  /* process the response from the server*/
  processLoginResp(resp) {
    if (this.loginResp['login_state'] == true) {
      this.globalInfo.login(resp['user_online'], resp['uname']);
      this.router.navigate(['']);
    } else {
      console.log(this.loginResp['description']);
    }
  }

  click() {
    this.info.increase()
  }

  show() {
    this.globalInfo.show()
  }

}
