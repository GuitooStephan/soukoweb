import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';

declare var _;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  loading = false;

  user;
  page = 0;
  count = 0;
  orders = [];

  selectUser$;
  myStore;
  currency;

  q = '';
  paymentStatus = 'ALL';
  confirmationStatus = 'ALL';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog,
    private modal: NgbModal,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private ordersService: OrdersService
  ) {
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
        this.q = params.q ? params.q : '';
        this.paymentStatus = params.paymentStatus ? params.paymentStatus : 'ALL';
        this.confirmationStatus = params.confirmationStatus ? params.confirmationStatus : 'ALL';
        this.fetchOrders( ( this.page - 1 ) * 10 );
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectUser$.unsubscribe();
  }

  fetchOrders( offset= 0 ) {
    this.loading = true;
    const q = this.q === '' ? null : this.q;
    const paymentStatus = this.paymentStatus === 'ALL' ? null : this.paymentStatus;
    const confirmed = this.confirmationStatus === 'ALL' ? null : this.confirmationStatus === 'CONFIRMED' ? true : false;
    this.ordersService.fetchOrders( this.user.admin.store_id, offset, q, paymentStatus, confirmed ).subscribe(
      data => {
        this.count = data.count;
        this.orders = data.results.map( o => ({ ...o, payment_status_translate_key: o.payment_status.replace(' ', '') }) );
        this.loading = false;
      }
    );
  }

  goToDetails( order ) {
    return this.router.navigate( [ '/dashboard/orders', order.id ] );
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

  searchOrders( e ) {
    if ( ( e.keyCode === 8 || e.keyCode === 46 ) && this.q === '' ) {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { page: null, q: null },
          queryParamsHandling: 'merge'
        }
      );
    }

    if ( e.keyCode === 13 ) {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { page: null, q: this.q },
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  filterOrders() {
    const paymentStatus = this.paymentStatus === 'ALL' ? null : this.paymentStatus;
    const confirmationStatus = this.confirmationStatus === 'ALL' ? null : this.confirmationStatus;
    console.log(this.paymentStatus);
    console.log(this.confirmationStatus);
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { page: null, paymentStatus, confirmationStatus },
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
        combineLatest([
          this.translateService.get('notificationMessages.orderDeletedSuccess'),
          this.ordersService.deleteOrder( order.id )
        ]).subscribe(
          ([message, data]) => {
            this.notificationService.success( null, message );
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
        this.translateService.get('notificationMessages.paymentRecordedSuccess').subscribe( message => {
          this.notificationService.success(null, message );
          this.fetchOrders( ( this.page - 1 ) * 10 );
        } );
      }
    }, (_) => { });
  }

  confirmOrder( order ) {
    combineLatest([
      this.translateService.get('notificationMessages.orderHasBeenConfirmed'),
      this.ordersService.updateOrder( order.id, { confirmed: true } )
    ]).subscribe( ([message, data]) => {
      this.notificationService.success( null, message );
      this.fetchOrders( ( this.page - 1 ) * 10 );
    } );
  }

}
