import { Component, OnInit, ViewChild, OnChanges, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Entry } from 'src/app/models/interfaces';
import { ContactColumns } from 'src/app/models/enums';
import { CONTACTS_COLUMNS } from 'src/app/models/constants';
import { Store } from '@ngrx/store';
import { remove_contact, get_contacts } from 'src/app/store/feature-stores/dashboard/actions';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() inDataSource: Entry[] = [];

  displayedColumns: ContactColumns[] = CONTACTS_COLUMNS;
  contactsColumnsEnum = ContactColumns;
  public dataSource = new MatTableDataSource<Entry>([]);

  subscriptions = new Subscription();

  constructor(private store$: Store<{}>, public dialog: MatDialog, private toastsService: ToastrService) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.inDataSource;
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.dataSource.data = this.inDataSource;
  }

  editContact(entry: Entry) {
    const dialogRef = this.dialog.open(EditContactComponent, {
      data: {...entry}
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store$.dispatch(get_contacts());
        this.subscriptions.unsubscribe();
      }
    }));
  }

  removeContact(id: number) {
    this.store$.dispatch(remove_contact({ entryId: id }));
  }

}
