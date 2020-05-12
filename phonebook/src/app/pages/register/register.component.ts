import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, switchMap, map, startWith, catchError, switchMapTo, debounceTime, distinctUntilChanged, debounce } from 'rxjs/operators';
import { pipe, of, Subscription } from 'rxjs';
import { StatusEnum } from 'src/app/models/enums';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { register } from 'src/app/store/feature-stores/authentication/actions';
import { registerStatus } from 'src/app/store/feature-stores/authentication/selectors';
import { NumberValidatorFn } from 'src/app/shared/validators/number.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm  = new FormGroup({
    cellphoneNumber: new FormControl('', [Validators.required, NumberValidatorFn]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', Validators.required)
  });

  registerStatus$ = this.store$.select(registerStatus);
  passwordCheck$ = this.registerForm.get('password').valueChanges.pipe(
      tap(password => {
          if (this.registerForm.get('confirmPassword').value) {
            if (this.registerForm.get('confirmPassword').value  !== password) {
                this.registerForm.get('confirmPassword').setErrors({
                    notSame: true
                });
            } else {
              this.registerForm.get('confirmPassword').setErrors(null);
            }
          }
      }),
      switchMap(password => {
          if (this.registerForm.get('confirmPassword').dirty && this.registerForm.get('confirmPassword').touched) {
            return of(password === this.registerForm.get('confirmPassword').value);
          } else {
              return of(true);
          }
      })
  );

  arePasswordsSame$ = this.registerForm.get('confirmPassword').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(100),
      switchMap(confirmedPassword => {
          const password = this.registerForm.get('password').value;
          if (confirmedPassword  !== password) {
              this.registerForm.get('confirmPassword').setErrors({
                  notSame: true
              });
          } else {
            this.registerForm.get('password').updateValueAndValidity();
            this.registerForm.get('confirmPassword').setErrors(null);
          }
          return of(confirmedPassword === password);
      })
  );

  status = StatusEnum;
  invalidMessage = '';

  constructor(private router: Router, private store$: Store<{}>, private toastsService: ToastrService) {}
  invalid = false;
  subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(this.passwordCheck$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
      this.store$.dispatch(register({ phoneNumber: this.registerForm.value.cellphoneNumber, password: this.registerForm.value.password, name: this.registerForm.value.name }));
  }
}
