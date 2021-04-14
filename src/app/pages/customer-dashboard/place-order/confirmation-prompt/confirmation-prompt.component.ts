import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  form: FormGroup;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private customersService: CustomersService
  ) {
    this.fetchData();
    this.setupForm();
  }

  setupForm() {
    this.form = this.fb.group({
      code: [ '', [ Validators.required, Validators.pattern( /^(\d)+$/ ), Validators.maxLength(6) ] ]
    });
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

  confirmOrder() {
    if ( ! this.form.valid ) {
      this.form.markAllAsTouched();
      return;
    }
    this.customersService.confirmOrder( this.myStore.id, this.form.value ).subscribe( data => {
      this.notificationService.success( null, 'Order has been confirmed' );
      this.router.navigate( [ '/customer/confirm-order', this.myStore.id, 'success' ] );
    } );
  }

  fetchData() {
    this.fetchData$ = this.storeService.fetchStoreForCustomers( this.route.snapshot.params.id ).subscribe( data => {
      this.myStore = data;
    } );
  }

}
