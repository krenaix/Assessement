import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './dashboard/search/search.component';


@NgModule({
    declarations: [
        LeftNavComponent,
        HomeComponent,
        DashboardComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HomeRoutingModule,
        SharedModule
    ],
})
export class HomeModule { }
