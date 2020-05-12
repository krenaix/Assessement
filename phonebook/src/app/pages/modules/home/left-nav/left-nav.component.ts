import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})


export class LeftNavComponent implements OnInit, AfterViewInit, OnDestroy {

  lastScrollPosition = 0;

  isScrolling = false;
  subscriptions: Subscription = new Subscription();
  constructor(private activatedRoute: ActivatedRoute, private store$: Store<{}>) {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(fromEvent(document, 'scroll').pipe(
      tap(ev => {
        // console.log(ev);
        const g = ev as any;
        const st = g.target.scrollingElement.scrollTop;
        if (st > this.lastScrollPosition) {
          // console.log('scrolling down %s', st);
          this.isScrolling = true;
        } else {
          if (g.target.scrollingElement.scrollTop === 0) {
            this.isScrolling = false;
          }
        }
        this.lastScrollPosition = st;
      })
    ).subscribe());
  }
  ngAfterViewInit() {
  }

  submit() {
  }
}
