import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { tap, switchMap, map, startWith, catchError, switchMapTo } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { nextTick } from 'q';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    displayProgressSpinner = false;
    fpForm: FormGroup;
    fpEmail: FormControl;
    constructor(private router: Router, private authService: AuthenticationService, private toastsService: ToastrService) {
        this.fpEmail = new FormControl('', [Validators.required, Validators.email]);
        this.fpForm = new FormGroup({
            fpEmail: this.fpEmail
        });
    }

    ngOnInit() {
        // this.user = JSON.parse(localStorage.getItem('user')) as IUser;
    }

    onSubmit() {
    //     if (this.fpForm.valid) {
    //         this.displayProgressSpinner = true;
    //         this.authService.forgotPassword(this.fpForm.value.fpEmail).pipe(
    //             tap(_ => {
                    
    //                 this.navigateOnSuccess();
    //             })
    //         ).subscribe(_ => {
    //             this.displayProgressSpinner = false;
    //         }, error => {
    //             this.displayProgressSpinner = false;
    //             this.toastsService.error('Oops something went wrong, please contact an administrator!! :_(');
    //         });
    //     }
    }
    navigateOnSuccess() {
        this.toastsService.success(`Email reset link has been sent to ${this.fpForm.value.fpEmail} :)`);
        this.router.navigate(['login']);
    }

}
