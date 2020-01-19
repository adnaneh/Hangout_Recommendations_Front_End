import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { IconsComponent } from './icons/icons.component';
import { SignupComponent } from './signup/signup.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MessageService } from './communicator/message.service'
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    LoginComponent,
    IconsComponent,
    SignupComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    FormsModule,
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
