import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { features } from 'src/app/features';
import { dashboardReducer } from './reducer';
import { ToastrModule } from 'ngx-toastr';
import { DashboardEffects } from './effects';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(features.DASHBOARD_FEATURE, dashboardReducer),
        EffectsModule.forFeature([DashboardEffects]),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-center',
            tapToDismiss: true,
            closeButton: true,
          })
    ]
})
export class DashboardModule {}
