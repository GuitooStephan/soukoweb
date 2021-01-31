import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from 'src/app/core/services/orders.service';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { RecordPaymentFields } from './record-payment.fields';

@Component({
  selector: 'app-record-payment',
  templateUrl: './record-payment.component.html',
  styleUrls: ['./record-payment.component.css']
})
export class RecordPaymentComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false }) paymentForm: DynamicFormComponent;
  fields = RecordPaymentFields;

  @Input() orderId;

  loading = false;

  constructor(
    private ordersService: OrdersService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  recordPayment() {
    if ( !this.paymentForm.valid ) {
      this.paymentForm.validateAllFormFields();
      return;
    }

    this.loading = true;
    this.ordersService.recordPayment( { order_id: this.orderId, ...this.paymentForm.value } ).subscribe(
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
