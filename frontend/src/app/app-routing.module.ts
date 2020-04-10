import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { FriendsComponent } from './components/friends/friends.component';
import { LffriendsComponent } from './components/lffriends/lffriends.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'signin',
    pathMatch: 'full'
  },
  {
    path : 'signin',
    component : SigninComponent
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate : [AuthGuard],
  },
  {
    path : 'friends',
    component : FriendsComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'lffriends',
    component : LffriendsComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'inicio',
    component : InicioComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
