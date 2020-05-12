import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/interfaces';
import { StatusEnum } from 'src/app/models/enums';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/feature-stores/authentication/actions';
import { loginStatus } from 'src/app/store/feature-stores/authentication/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginStatus$ = this.store$.select(loginStatus);
  lgForm: FormGroup;
  phoneNumber: FormControl;
  password: FormControl;
  status;

  statusEnum = StatusEnum;
  invalidMessage = '';
  constructor(private router: Router, private store$: Store<{}>) {

    this.phoneNumber = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.lgForm = new FormGroup({
      phoneNumber: this.phoneNumber,
      password: this.password
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    if (this.lgForm.valid) {
      this.store$.dispatch(login({ phoneNumber: this.lgForm.value.phoneNumber, password: this.lgForm.value.password }));
    }

  }

  // resetPassword() {
  //   this.router.navigate(['password-reset']);
  // }

  // navigateToForgotPasswordPage(e: MouseEvent) {
  //   e.preventDefault();

  //   this.router.navigate(['forgot-password']);
  // }

}
