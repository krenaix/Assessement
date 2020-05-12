import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { features } from 'src/app/features';
import { userReducer } from './reducer';
// import { UserEffects } from './effects';
import { ToastrModule } from 'ngx-toastr';
import { UserEffects } from './effects';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(features.USER_FEATURE, userReducer),
        EffectsModule.forFeature([UserEffects]),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-center',
            tapToDismiss: true,
            closeButton: true,
          })
    ],
    // providers: [UserStoreService]
})
export class AuthenticationModule {}
