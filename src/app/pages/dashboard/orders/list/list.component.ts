import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import * as ICC from 'iso-country-currency';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import { ConfirmPromptComponent } from 'src/app/shared/prompts/confirm-prompt/confirm-prompt.component';
import { RecordPaymentComponent } from '../record-payment/record-payment.component';

declare var _;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  form: FormGroup;

  loading = false;

  user;
  page = 0;
  count = 0;
  orders = [];

  selectUser$;
  myStore;
  currency;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog,
    private modal: NgbModal,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private ordersService: OrdersService
  ) {
    this.setupForm();

    this.selectUser$ = combineLatest([
      this.route.queryParams,
      this.store.pipe( select( selectUser ) ),
      this.store.pipe( select( selectStore ) )
    ]).subscribe(
      ([params, user, myStore]) => {
        this.user = user;
        this.myStore = myStore;
        this.currency = myStore ? ICC.getAllInfoByISO( myStore.country ).symbol : null;
        this.page = params.page ? params.page : 1;
        this.fetchOrders( ( this.page - 1 ) * 10 );
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectUser$.unsubscribe();
  }

  setupForm() {
    this.form = this.fb.group({
      q: [ '' ],
      payment_status: [ 'all' ]
    });

    this.form.get( 'q' ).valueChanges.subscribe(
      data => {
        if ( data ) {
          this.fetchOrders( 0, data.trim(), this.form.get( 'payment_status' ).value );
        } else {
          this.fetchOrders( 0, null, this.form.get( 'payment_status' ).value );
        }
      }
    );

    this.form.get( 'payment_status' ).valueChanges.subscribe(
      data => {
        if ( data ) {
          const _data = data === 'all' ? '' : data;
          this.fetchOrders( 0, this.form.get( 'q' ).value, _data );
        } else {
          this.fetchOrders( 0, this.form.get( 'q' ).value );
        }
      }
    );
  }

  fetchOrders( offset= 0, q= null, payment_status= null ) {
    this.loading = true;
    this.ordersService.fetchOrders( this.user.admin.store_id, offset, q, payment_status ).subscribe(
      data => {
        this.count = data.count;
        this.orders = data.results;
        this.loading = false;
      }
    );
  }

  goToDetails( order ) {
    return this.router.navigate( [ '/orders', order.id ] );
  }

  fetchPage( newPage ) {
    newPage = newPage === 1 ? null : newPage;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { page: newPage },
        queryParamsHandling: 'merge'
      }
    );
  }

  promptForDeletingOrder( order ): void {
    const dialogRef = this.dialog.open(ConfirmPromptComponent, {
      width: '500px',
      data: {title: `Would you like to delete the order of : ${order.customer.first_name} ${order.customer.last_name}`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.ordersService.deleteOrder( order.id ).subscribe(
          data => {
            this.notificationService.success( null, 'Order deleted successfully' );
            this.fetchOrders( 0 );
          }
        );
      }
    });
  }

  recordPayment( order ) {
    const modalRef = this.modal.open(RecordPaymentComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.orderId = order.id;
    modalRef.componentInstance.remainingAmount = order.total_amount - +_.sumBy( order.payments, 'amount' );
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Payment recorded successfully!');
        this.fetchOrders();
      }
    }, (_) => { });
  }

}
