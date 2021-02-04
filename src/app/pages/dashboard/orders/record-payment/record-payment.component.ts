import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-record-payment',
  templateUrl: './record-payment.component.html',
  styleUrls: ['./record-payment.component.css']
})
export class RecordPaymentComponent implements OnInit {
  form: FormGroup;

  @Input() orderId;
  @Input() remainingAmount;

  loading = false;

  constructor(
    private ordersService: OrdersService,
    private activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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
