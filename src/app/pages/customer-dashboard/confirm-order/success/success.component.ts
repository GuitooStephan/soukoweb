import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit, OnDestroy {
  fetchData$;
  myStore;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {
    this.fetchData();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.fetchData$.unsubscribe();
  }

  fetchData() {
    this.fetchData$ = this.storeService.fetchStoreForCustomers( this.route.snapshot.params.id ).subscribe( data => {
      this.myStore = data;
    } );
  }

}
