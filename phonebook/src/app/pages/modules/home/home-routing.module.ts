import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { AuthGuard } from 'src/app/gaurds/auth.gaurd';
import { HomeGuard } from 'src/app/gaurds/home.gaurd';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { origin: 'HomeComponent' },
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard, HomeGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, HomeGuard]
      },
      {
        path: 'new-contact',
        component: NewContactComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
