import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { flatMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { CustomersService } from 'src/app/core/services/customers.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectCart } from 'src/app/core/store/selectors/cart.selectors';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { CustomerInfoFields } from './customer-information.fields';
import * as CartActions from 'src/app/core/store/actions/cart.actions';

declare var _;

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  @ViewChild( DynamicFormComponent, { static: false } ) customerInfo: DynamicFormComponent;
  @Input() myStore;
  @Input() products = [];
  @Input() currency;
  @Output() getOrder: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  fields = CustomerInfoFields;

  total = 0;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private ordersService: OrdersService,
    private router: Router,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.setupForm();

    this.store.pipe( select( selectCart ) ).subscribe( cart => {
      if ( cart.length < 1 ) {
        this.dismiss();
        return;
      }
      this.products = cart;
      this.setupForm();
    } );
  }

  setupForm() {
    this.form = this.fb.group({
      order_items: new FormArray([])
    });

    this.products.forEach(p => {
      const item = this.fb.group({
        product: [ p.product ],
        // tslint:disable-next-line: max-line-length
        quantity: [ 1, [ Validators.required, Validators.min(1), Validators.pattern( /^(\d)+$/ ), Validators.max( p.product.total_stock ) ] ]
      });

      this.o.push( item );
    });

    this.total = _.sumBy(this.products, p => parseFloat( p.product.selling_price ) || 0.00);

    this.o.valueChanges.subscribe(
      data => {
        const filter_data = data.filter( o => o.quantity > 0 );
        this.total = _.sumBy(filter_data, o => ( parseFloat( o.quantity ) * parseFloat( o.product.selling_price ) ) || 0.00);
      }
    );
  }

  increaseQuantity( control ) {
    const value = control.value;
    control.controls.quantity.setValue( value.quantity + 1 );
  }

  decreaseQuantity( control ) {
    const value = control.value;
    control.controls.quantity.setValue( value.quantity - 1 );
  }

  removeFromCart( p ) {
    this.store.dispatch( CartActions.removeProduct( { data: { id: p.id } } ) );
  }

  placeOrder() {
    if ( !this.form.valid || !this.customerInfo.valid ) {
      this.form.markAllAsTouched();
      this.customerInfo.validateAllFormFields();
      return;
    }

    this.loading = true;

    const customerPayload = this.customerInfo.value;

    if ( customerPayload.phone_number && ( ! ( typeof customerPayload.phone_number === 'string' ) )  ) {
      customerPayload.phone_number = customerPayload.phone_number.e164Number;
    }

    this.customersService.placeOrderAnonymous( this.myStore.id, {
      order : {
        store_id: this.myStore.id
      },
      customer : {
        ...customerPayload,
        store_id: this.myStore.id
      }
    } ).pipe(
      flatMap( result => {
        const calls = this.o.value.map(
          o => this.ordersService.createOrderItem( {
            order_id: result.order.id,
            product_id: o.product.id,
            quantity: o.quantity
          } )
        );
        this.getOrder.emit( result );
        return combineLatest( [ ...calls ] );
      } )
    ).subscribe(
      data => {
        this.notificationService.success( null, 'Order has been placed, please confirm your order' );
        this.loading = false;
        this.activeModal.close( 'success' );
      }
    );
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  get c() { return this.form.controls; }
  get o() { return this.c.order_items as FormArray; }
}
