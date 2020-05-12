import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Entry } from 'src/app/models/interfaces';
import { ContactColumns } from 'src/app/models/enums';
import { CONTACTS_COLUMNS } from 'src/app/models/constants';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() inDataSource: Entry[] = [];

  displayedColumns: ContactColumns[] = CONTACTS_COLUMNS;
  contactsColumnsEnum = ContactColumns;
  public dataSource = new MatTableDataSource<Entry>([]);

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.inDataSource;
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.dataSource.data = this.inDataSource;
  }

}
