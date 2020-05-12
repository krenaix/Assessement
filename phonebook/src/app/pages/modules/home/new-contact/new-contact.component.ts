import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { NumberValidatorFn } from 'src/app/shared/validators/number.validator';
import { create_contact } from 'src/app/store/feature-stores/dashboard/actions';
import { getCreateContactStatus } from 'src/app/store/feature-stores/dashboard/selector';
import { StatusEnum } from 'src/app/models/enums';
import { tap } from 'rxjs/operators';


@Component({
    selector: 'app-new-contact',
    templateUrl: './new-contact.component.html',
    styleUrls: ['./new-contact.component.scss']
})


export class NewContactComponent implements OnInit, OnDestroy {
    title = 'Create Contact';

    createContactStatus$ = this.store$.select(getCreateContactStatus).pipe(
        tap(value => {
            if (value === StatusEnum.Busy) {
                this.createContactForm.disable();
            } else if (value === StatusEnum.Done) {
                this.createContactForm.reset();
                this.createContactForm.markAsPristine();
                this.createContactForm.markAsUntouched();
                this.toastsService.success('Contact Created', 'Successful');
                this.createContactForm.enable();
            } else if (value === StatusEnum.Failed) {
                this.createContactForm.enable();
                this.toastsService.error('Oops, something went wrong while saving your contact, pleae try again');
            } else {
                this.createContactForm.enable();
            }
        })
    );

    status = StatusEnum;

    createContactForm = new FormGroup({
        name: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [Validators.required, NumberValidatorFn])
    });


    constructor(private route: ActivatedRoute, private toastsService: ToastrService, private store$: Store<{}>, private router: Router) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    onSubmit() {
        this.store$.dispatch(create_contact({ entry: this.createContactForm.value }));
    }

    cancel() {
        this.router.navigate(['home/dashboard']);
    }
}
