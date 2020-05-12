import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { StatusEnum } from 'src/app/models/enums';
import { Subscription, Observable, of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { NumberValidatorFn } from 'src/app/shared/validators/number.validator';
import { Entry } from 'src/app/models/interfaces';
import { edit_contact } from 'src/app/store/feature-stores/dashboard/actions';
import { getEditContactStatus } from 'src/app/store/feature-stores/dashboard/selector';


@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit, OnDestroy {


    editCocontactStatus$ = this.store$.select(getEditContactStatus).pipe(
        tap(value => {
            if (value === StatusEnum.Busy) {
                this.editContactForm.disable();
            } else if (value === StatusEnum.Done) {
                this.toastsService.success('Contact Edited', 'Successful');
                this.editContactForm.enable();
                this.dialogRef.close(true);
            } else if (value === StatusEnum.Failed) {
                this.editContactForm.enable();
                this.toastsService.error('Oops, something went wrong while saving contact details, please try again');
            } else {
                this.editContactForm.enable();
            }
        })
    );

    editStatus$ = this.store$.select(getEditContactStatus);

    status = StatusEnum;
    subscriptions = new Subscription();

    editContactForm = new FormGroup({
        id: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [Validators.required, NumberValidatorFn]),
    });

    constructor(private route: ActivatedRoute, private toastsService: ToastrService, private router: Router, private store$: Store<{}>,
                public dialogRef: MatDialogRef<EditContactComponent>, @Inject(MAT_DIALOG_DATA) public data: Entry) {
        this.editContactForm.get('name').setValue(data.name);
        this.editContactForm.get('phoneNumber').setValue(data.phoneNumber);
        this.editContactForm.get('id').setValue(data.id);
    }

    ngOnInit(): void {
    }

    onSubmit() {

    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    save() {
        this.store$.dispatch(edit_contact({ entry: this.editContactForm.value }));
    }

    close() {
        this.dialogRef.close(false);
    }
}
