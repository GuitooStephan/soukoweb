import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/core/services/customers.service';
import { NotificationService } from 'src/app/core/services/notification.service';
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
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private customersService: CustomersService
  ) {
    this.fetchData();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.fetchData$.unsubscribe();
  }

  resendOrderConfirmationCode() {
    // tslint:disable-next-line: max-line-length
    this.customersService.resendOrderConfirmationCode( this.myStore.id, { order_id: this.route.snapshot.params.orderId } ).subscribe( data => {
      this.notificationService.success( null, 'Email resent.' );
    } );
  }

  fetchData() {
    this.fetchData$ = this.storeService.fetchStoreForCustomers( this.route.snapshot.params.id ).subscribe( data => {
      this.myStore = data;
    } );
  }

}
