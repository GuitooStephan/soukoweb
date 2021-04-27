import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  selectStore$;
  myStore;

  loading = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.fetchStore();
  }

  fetchStore() {
    this.loading = true;
    this.selectStore$ = this.store.pipe( select( selectStore ) )
    .subscribe(
      data => {
        this.myStore = data;
        this.loading = false;
      }
    );
  }

}
