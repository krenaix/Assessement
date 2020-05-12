import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MaterialModule } from '../material.module';




@NgModule({
    declarations: [
        TopNavComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-center',
            tapToDismiss: true,
            closeButton: true,
        }),
        MaterialModule
    ],
    providers: [DatePipe, CurrencyPipe],
    exports: [
        HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule, ToastrModule,
        TopNavComponent, MaterialModule
    ]
})
export class SharedModule { }
