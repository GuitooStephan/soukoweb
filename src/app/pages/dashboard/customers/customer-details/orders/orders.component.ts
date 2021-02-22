import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  form: FormGroup;

  orders = [];
  page = 0;
  count = 0;

  loading = false;

  selectStore$;
  myStore;
  currency;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private customersService: CustomersService
  ) {
    this.setupForm();

    this.selectStore$ = this.store.pipe( select( selectStore ) )
    .pipe( first() )
    .subscribe(
      data => {
        this.myStore = data;
        this.currency = ICC.getAllInfoByISO( this.myStore.country ).currency;
      }
    );

    this.route.queryParams.subscribe(
      params => {
        this.page = params.page ? params.page : 1;
        this.fetchOrders( ( this.page - 1 ) * 10 );
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectStore$.unsubscribe();
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
    this.customersService.fetchOrders( this.route.parent.snapshot.params.id, offset, q, payment_status ).subscribe(
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

}
