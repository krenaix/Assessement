import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MinimumSearchValidatorFn } from 'src/app/shared/validators';
import { SearchCriteria } from 'src/app/models/interfaces';
import { search } from 'src/app/store/feature-stores/dashboard/actions';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {

    searchForm = new FormGroup({
        entryName: new FormControl(''),
        entryNumber: new FormControl('')
    }, [MinimumSearchValidatorFn]);

    subscription = new Subscription();

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private store$: Store<{}>) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onActivate() {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
        // window.scrollTo(0, 0);
    }

    onSubmit() {
        const searchCriteria: SearchCriteria = {
            entryName: this.searchForm.value.entryName,
            entryNumber: this.searchForm.value.entryNumber
        };

        this.store$.dispatch(search({ searchCriteria }));

    }

    onClear() {
        this.searchForm.reset();
        this.searchForm.markAsPristine();
        this.searchForm.markAsUntouched();

        const searchCriteria: SearchCriteria = {
            entryName: this.searchForm.value.entryName,
            entryNumber: this.searchForm.value.entryNumber
        };
        this.store$.dispatch(search({ searchCriteria }));
    }
}
