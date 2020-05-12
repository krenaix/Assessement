// Angular imports
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ngrx imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// custom imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { reducers, metaReducers } from './reducers';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorService } from './services/auth-service/auth-interceptor.service';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material.module';
import { AuthenticationModule } from './store/feature-stores/authentication/authentication.module';
import { RegisterComponent } from './pages/register/register.component';
import { HomeGuard } from './gaurds/home.gaurd';
import { AuthGuard } from './gaurds/auth.gaurd';
import { DashboardModule } from './store/feature-stores/dashboard/dashboard.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent
    // TopNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }) : [],
    EffectsModule.forRoot([]),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      tapToDismiss: true,
      closeButton: true,
    }),
    SharedModule,
    AuthenticationModule,
    DashboardModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    HomeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {provide : LocationStrategy , useClass: HashLocationStrategy},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
