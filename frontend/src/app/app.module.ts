import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { FriendsComponent } from './components/friends/friends.component';
import { LffriendsComponent } from './components/lffriends/lffriends.component';
import { ProfileComponent } from './components/profile/profile.component';


import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthGuard } from './auth.guard'
import { AuthInterceptorService} from './services/auth/auth-interceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    FriendsComponent,
    LffriendsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
