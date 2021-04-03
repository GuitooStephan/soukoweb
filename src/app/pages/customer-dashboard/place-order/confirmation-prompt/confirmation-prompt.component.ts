import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-confirmation-prompt',
  templateUrl: './confirmation-prompt.component.html',
  styleUrls: ['./confirmation-prompt.component.css']
})
export class ConfirmationPromptComponent implements OnInit, OnDestroy {
  fetchData$;
  myStore;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute
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
