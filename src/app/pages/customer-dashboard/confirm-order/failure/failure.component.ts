import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent implements OnInit, OnDestroy {
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
      console.log(data);
    } );
  }

}
