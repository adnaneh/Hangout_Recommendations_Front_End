import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommunicatorService } from '../communicator/communicator.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email: string;
  password: string;
  password_repeat: string;
  authorized_email: boolean;
  CAPTCHA_sent: boolean = false;
  CAPTCHA: number;          // generated CAPTCHA
  CAPTCHA_input: number;    // user's input CAPTCHA
  error: boolean = false;  //true means have error
  error_msg: string;
  regex = /^[0-9a-zA-Z_]+$/;    // allowed characters for new password
  button_text = "Envoyer Captcha";

  constructor(private communicatorService: CommunicatorService,
    private router: Router) {
  }

  ngOnInit() {
  }

  /** require the backend to send the CAPTCHA by email*/
  sendCaptcha() {
    this.error = false;
    this.button_text = "Sending...";
    this.CAPTCHA = Math.floor((Math.random() * 9e5 + 1e5));
    console.log(this.CAPTCHA);
    this.communicatorService.sendCaptcha({ email: this.email, captcha: this.CAPTCHA.toString() })
      .subscribe(resp => {
        console.log(resp);
        this.authorized_email = resp['sending_state'];
        this.CAPTCHA_sent = true;
        if (this.authorized_email == false) {
          this.error = true;
          this.error_msg = "Email incorrect!";
        };
        this.button_text = "Envoyer Captcha";
      },
        error => {
          console.log(error);
          this.authorized_email = false;
          if (this.authorized_email == false) {
            this.error = true;
            this.error_msg = "Échec de l'envoi, veuillez réessayer !";
            this.button_text = "Envoyer Captcha";
          };
        });
  }

  /** check and send the new password to the server if the new password is in correct format  */
  resetPassword() {

    if (this.verify()) {
      console.log("correct");
      this.communicatorService.resetPassword({ email: this.email, pword: this.password })
        .subscribe(
          resp => {
            if (resp['reset_state'] == true) {
              this.router.navigate(['login']);
            }
          },
          error => {
            this.error = true;
            this.error_msg = "Notre serveur est mort x.x";
          });
    }
  }

  /** verrify if CAPTCHA,password and email are valid*/
  verify() {
    if (this.CAPTCHA_sent != true) {  //fail to send captcha
      this.error = true;
      this.error_msg = "Il faut d'abord envoyer un captcha";
      return false
    } else if (this.authorized_email == false) {  //email incorrect
      this.error = true;
      this.error_msg = "Email incorrect!";
      return false
    } else if (this.password.length < 8 && this.password.length > 20) {  //length of password incorrect
      this.error = true;
      console.log(this.password.length);
      this.error_msg = "Le mot de passe devrait entre 8 et 20 caractères!";
      return false
    } else if (this.CAPTCHA_input != this.CAPTCHA) {  //CAPTCHA incorrect
      this.error = true;
      this.error_msg = "CAPTCHA incorrect!";
      return false
    } else if (!this.regex.test(this.password)) { // new password contains invalid character
      this.error = true;
      this.error_msg = "Le mot de passe ne contient que chiffre et alphabet!";
      return false
    } else if (this.password != this.password_repeat) { //the 2 inputs are incoherent 
      this.error = true;
      this.error_msg = "Les deux mots de passe sont incohérentes!";
      return false
    }
    this.error = false;
    return true
  }

}
