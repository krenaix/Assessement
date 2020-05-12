import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loggedInUser } from 'src/app/store/feature-stores/authentication/selectors';
import { log_out } from 'src/app/store/feature-stores/authentication/actions';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  user$ = this.store$.select(loggedInUser);


  constructor(private router: Router, private store$: Store<{}>) {}

  ngOnInit() {
  }

  onSubmitSearch() {

  }

  onSubmitSearchDropDown() {

  }

  logOut(event$: MouseEvent) {
    this.store$.dispatch(log_out());
  }
}
