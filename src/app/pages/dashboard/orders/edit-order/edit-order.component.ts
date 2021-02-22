import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, pipe } from 'rxjs';
import { first, flatMap, startWith } from 'rxjs/operators';
import { CustomersService } from 'src/app/core/services/customers.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import * as ICC from 'iso-country-currency';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';

declare var _: any;

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit, OnDestroy {
  order;

  initialOrderItems = [];

  form: FormGroup;

  customerOptions = [];
  productOptions = [];
  total = 0;

  selectData$;
  user;
  myStore;
  currency;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private customersService: CustomersService,
    private ordersService: OrdersService,
    private productsService: ProductsService
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
        this.fetchOrder();
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectData$.unsubscribe();
  }

  fetchOrder() {
    this.ordersService.fetchOrder( this.route.snapshot.params.id ).subscribe(
      data => {
        this.initialOrderItems = data.order_items;
        this.order = data;
        this.setupForm();
      }
    );
  }

  setupForm() {
    this.form = this.fb.group({
      customer_id: [ this.order.customer.id, Validators.required ],
      customer_name: [ this.order.customer, Validators.required ],
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

    this.order.order_items.forEach(o => {
      const newItem = this.fb.group({
        id: [ o.id ],
        product_id: [ o.product.id, [ Validators.required ] ],
        product_name: [ o.product, [ Validators.required ] ],
        quantity: [ o.quantity, [ Validators.required, Validators.pattern( /^(\d)+$/ ) ] ],
        total_stock: [ o.product.total_stock, [ Validators.required ] ],
        price: [ o.product.selling_price, [ Validators.required ] ],
        cost: [ parseFloat( o.quantity ) * parseFloat( o.product.selling_price ), [ Validators.required, Validators.pattern( /^\d*\.?\d{0,2}$/ ) ] ]
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
    });
  }

  addOrderItem() {
    const newItem = this.fb.group({
      id: [ '' ],
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

  removeOrderItem(i: number): void {
    this.o.removeAt(i);
  }

  editOrder() {
    if ( ! this.form.valid ) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    this.getCreatingCalls( this.o.value );
    this.getUpdatingCalls( this.o.value );
    this.getDeletingCalls( this.o.value );
    this.ordersService.updateOrder( this.order.id, {
      customer_id: formValue.customer_id
    } ).pipe(
      flatMap( order => {
        const calls = [
          ...this.getCreatingCalls( this.o.value ),
          ...this.getUpdatingCalls( this.o.value ),
          ...this.getDeletingCalls( this.o.value )
        ];
        return combineLatest( [ ...calls ] );
      } )
    ).subscribe(
      data => {
        this.notificationService.success( null, 'Order has been updated' );
        this.router.navigate( [ '/orders/list' ] );
      }
    );
  }

  getDeletingCalls( currentOrderItems ): any[] {
    const remainingOrderItems = currentOrderItems.filter( o => o.id ).map( o => o.id );
    const deletedOrderItems = this.initialOrderItems.filter( o => !remainingOrderItems.includes( o.id ) );
    return deletedOrderItems.map( o => this.ordersService.deleteOrderItem( o.id ) );
  }

  getUpdatingCalls( currentOrderItems ): any[] {
    const updatedOrderItems = currentOrderItems.filter( o => o.id );
    return updatedOrderItems.map( o => this.ordersService.updateOrderItem( o.id, {
      product_id: o.product_id,
      quantity: o.quantity,
      cost: o.cost
    } ) );
  }

  getCreatingCalls( currentOrderItems ): any[] {
    const newOrderItems = currentOrderItems.filter( o => !o.id );
    return newOrderItems.map( o => this.ordersService.createOrderItem({
      order_id: this.order.id,
      product_id: o.product_id,
      quantity: o.quantity,
      cost: o.cost
    }) );
  }

  displayCustomer(o): string {
    return o ? o.first_name + ' ' + o.last_name : '';
  }

  displayProduct(o): string {
    return o ? o.name + ' - ¢' + o.selling_price : '';
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

  goBack() {
    this.location.back();
  }

  get c() { return this.form.controls; }
  get o() { return this.c.order_items as FormArray; }

}
