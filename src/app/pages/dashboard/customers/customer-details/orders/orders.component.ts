import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/core/services/customers.service';
import * as ICC from 'iso-country-currency';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { select, Store } from '@ngrx/store';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  q = '';
  paymentStatus = 'ALL';
  confirmationStatus = 'ALL';

  orders = [];
  page = 0;
  count = 0;

  loading = false;

  selectStore$;
  myStore;
  currency;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private customersService: CustomersService
  ) {
    this.selectStore$ = this.store.pipe( select( selectStore ) )
    .subscribe(
      data => {
        this.myStore = data;
        this.currency = data ? ICC.getAllInfoByISO( data.country ).symbol : null;
      }
    );

    this.route.queryParams.subscribe(
      params => {
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
    this.selectStore$.unsubscribe();
  }

  fetchOrders( offset= 0 ) {
    this.loading = true;
    const q = this.q === '' ? null : this.q;
    const paymentStatus = this.paymentStatus === 'ALL' ? null : this.paymentStatus;
    const confirmed = this.confirmationStatus === 'ALL' ? null : this.confirmationStatus === 'CONFIRMED' ? true : false;
    this.customersService.fetchOrders( this.route.parent.snapshot.params.id, offset, q, paymentStatus, confirmed ).subscribe(
      data => {
        this.count = data.count;
        this.orders = data.results;
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
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { page: null, paymentStatus, confirmationStatus },
        queryParamsHandling: 'merge'
      }
    );
  }

}
