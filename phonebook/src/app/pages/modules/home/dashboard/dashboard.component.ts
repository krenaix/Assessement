import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StatusEnum } from 'src/app/models/enums';
import { getDashboardLoadingStatus, getPhonebookEntries } from 'src/app/store/feature-stores/dashboard/selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  contacts$ = this.store$.select(getPhonebookEntries);
  dashboardLoadStatus$ = this.store$.select(getDashboardLoadingStatus);

  status = StatusEnum;
  today = new Date();

  constructor(private store$: Store<{}>) { }

  ngOnInit(): void {
  }

}
