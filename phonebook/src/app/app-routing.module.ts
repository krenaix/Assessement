import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/modules/home/home.component';

// import { P404Component } from './views/error/404.component';
// import { P500Component } from './views/error/500.component';
import { LoginComponent } from '../app/pages/login/login.component';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeGuard } from './gaurds/home.gaurd';
import { AuthGuard } from './gaurds/auth.gaurd';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard, HomeGuard]
  },
  // {
  //   path: '404',
  //   component: P404Component,
  //   data: {
  //     title: 'Page 404',
  //     roles: ['All']
  //   }
  // },
  // {
  //   path: '500',
  //   component: P500Component,
  //   data: {
  //     title: 'Page 500',
  //     roles: ['All']
  //   }
  // },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Rergister Page'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password Page'
    }
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
