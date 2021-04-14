import { CurrencyPipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { first, flatMap, map, startWith } from 'rxjs/operators';
import { CustomersService } from 'src/app/core/services/customers.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import * as ICC from 'iso-country-currency';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import { AddCustomerComponent } from '../../customers/add-customer/add-customer.component';

declare var _: any;

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit, OnDestroy {
  form: FormGroup;
  customerOptions = [];
  productOptions = [];

  user;
  selectData$;
  myStore;
  currency;

  total = 0.00;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private modal: NgbModal,
    private ordersService: OrdersService,
    private store: Store<AppState>,
    private customersService: CustomersService,
    private productsService: ProductsService,
    private notificationService: NotificationService
  ) {
    this.selectData$ = combineLatest( [
      this.store.pipe( select( selectUser ) ),
      this.store.pipe( select( selectStore ) )
    ] )
    .subscribe(
      ([user, myStore]) => {
        this.user = user;
        this.myStore = myStore;
        this.currency = myStore ? ICC.getAllInfoByISO( myStore.country ).symbol : null;
        this.setupForm();
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectData$.unsubscribe();
  }

  setupForm() {
    this.form = this.fb.group({
      customer_id: [ '', Validators.required ],
      customer_name: [ '', Validators.required ],
      delivery_fee: [ 0.00, [ Validators.required, Validators.pattern( /^\d*\.?\d{0,2}$/ ) ] ],
      paying_now: [ false ],
      order_items: new FormArray([])
    });

    this.form.get( 'customer_name' ).valueChanges
      .pipe(
        startWith(''),
        flatMap(value => {
          const _value = typeof value === 'string' ? value : value.first_name + ' ' + value.last_name;
          return this.customersService.searchStoreCustomers( this.user.admin.store_id, _value.toLowerCase() );
        })
      ).subscribe(
        data => {
          this.customerOptions = data.results;
        }
      );

    this.o.valueChanges.subscribe(
      data => {
        this.total = _.sumBy(data, o => parseFloat( o.cost ) || 0.00);
      }
    );

    this.addOrderItem();
  }

  addOrderItem() {
    const newItem = this.fb.group({
      product_id: [ '', [ Validators.required ] ],
      product_name: [ '', [ Validators.required ] ],
      quantity: [ '', [ Validators.required, Validators.pattern( /^(\d)+$/ ) ] ],
      total_stock: [ '', [ Validators.required ] ],
      price: [ 0.00, [ Validators.required ] ],
      cost: [ '', [ Validators.required, Validators.pattern( /^\d*\.?\d{0,2}$/ ) ] ]
    });
    newItem.get( 'product_name' ).valueChanges
      .pipe(
        startWith(''),
        flatMap(value => {
          const _value = typeof value === 'string' ? value : value.name;
          return this.productsService.searchProducts( this.user.admin.store_id, _value.toLowerCase() );
        })
      ).subscribe(
        data => {
          this.productOptions = data.results;
        }
      );

    newItem.get( 'quantity' ).valueChanges.subscribe(
      value => {
        value ? newItem.get( 'cost' ).setValue( parseFloat( value ) * parseFloat( newItem.get( 'price' ).value ) ) :
          newItem.get( 'cost' ).setValue( '' );
      }
    );

    this.o.push( newItem );
  }

  createOrder() {
    if ( ! this.form.valid ) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    this.ordersService.createOrder( {
      customer_id: formValue.customer_id,
      delivery_fee: formValue.delivery_fee,
      store_id: this.user.admin.store_id
    } ).pipe(
      flatMap( order => {
        const calls = this.o.value.map(
          o => this.ordersService.createOrderItem( {
            order_id: order.id,
            product_id: o.product_id,
            quantity: o.quantity,
            cost: o.cost
          } )
        );
        return combineLatest( [ ...calls ] );
      } ),
      flatMap( orderItems => {
        if ( formValue.paying_now ) {
          const orderId = orderItems[0]['order'];
          return this.ordersService.recordPayment( { order_id: orderId, amount: +this.total } );
        } else {
          return of( null );
        }
      } )
    ).subscribe(
      data => {
        this.notificationService.success( null, 'Order has been created' );
        this.router.navigate( [ '/' ] );
      }
    );
  }

  removeOrderItem(i: number): void {
    this.o.removeAt(i);
  }

  goBack() {
    this.location.back();
  }

  createCustomer() {
    const modalRef = this.modal.open(AddCustomerComponent, { centered: true, size: 'lg' });
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Customer created successfully!');
        this.form.get( 'customer_name' ).setValue( '' );
      }
    }, (_) => { });
  }

  displayCustomer(o): string {
    return o ? o.first_name + ' ' + o.last_name : '';
  }

  displayProduct(o): string {
    return o ? o.name : '';
  }

  productSelected(e, i) {
    this.o.at(i).get( 'product_id' ).setValue( e.option.value.id );
    this.o.at(i).get('quantity').setValidators( [ Validators.max( e.option.value.total_stock ) ] );
    this.o.at(i).get( 'total_stock' ).setValue( e.option.value.total_stock );
    this.o.at(i).get( 'price' ).setValue( e.option.value.selling_price );
  }

  customerSelected(e) {
    this.form.get( 'customer_id' ).setValue( e.option.value.id );
  }

  get c() { return this.form.controls; }
  get o() { return this.c.order_items as FormArray; }

}
