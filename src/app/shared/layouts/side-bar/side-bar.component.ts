import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy {
  selectStore$;

  myStore;

  constructor(
    private store: Store<AppState>
  ) {
    this.selectStore$ = this.store.pipe( select( selectStore ) ).subscribe( data => {
      this.myStore = data;
    } );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectStore$.unsubscribe();
  }

}
