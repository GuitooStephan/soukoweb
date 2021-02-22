import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { OrdersService } from 'src/app/core/services/orders.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import * as ICC from 'iso-country-currency';

@Component({
  selector: 'app-record-payment',
  templateUrl: './record-payment.component.html',
  styleUrls: ['./record-payment.component.css']
})
export class RecordPaymentComponent implements OnInit, OnDestroy {
  form: FormGroup;

  @Input() orderId;
  @Input() remainingAmount;

  loading = false;

  selectStore$;
  myStore;
  currency;

  constructor(
    private ordersService: OrdersService,
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.selectStore$ = this.store.pipe( select( selectStore ) )
    .subscribe( myStore => {
      this.myStore = myStore;
      this.currency = myStore ? ICC.getAllInfoByISO( myStore.country ).symbol : null;
      this.setUpForm();
    } );
  }

  setUpForm() {
    this.form = this.fb.group({
      full_payment: [ false ],
      amount: [ 0, [ Validators.required, Validators.pattern( /^\d*\.?\d{0,2}$/ ), Validators.max( +this.remainingAmount ) ] ]
    });

    this.form.get( 'full_payment' ).valueChanges.subscribe(
      data => {
        if ( data ) {
          this.form.get( 'amount' ).setValue( +this.remainingAmount );
        } else {
          this.form.get( 'amount' ).setValue( 0 );
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.selectStore$.unsubscribe();
  }

  recordPayment() {
    if ( !this.form.valid ) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.ordersService.recordPayment( { order_id: this.orderId, amount: this.form.value.amount } ).subscribe(
      data => {
        this.loading = false;
        this.activeModal.close( 'success' );
      }
    );
  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
