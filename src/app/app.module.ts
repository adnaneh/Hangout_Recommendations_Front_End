import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { IconsComponent } from './icons/icons.component';
import { SignupComponent } from './signup/signup.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MessageService } from './communicator/message.service';
import { ConfirmpswDirectiveDirective } from './icons/confirmpsw-directive.directive'



@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    LoginComponent,
    IconsComponent,
    SignupComponent,
    EventDetailComponent,
    ConfirmpswDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: EventComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'eventdetail/:id', component: EventDetailComponent },
      { path: 'icons', component: IconsComponent }
    ]),
    BrowserAnimationsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
