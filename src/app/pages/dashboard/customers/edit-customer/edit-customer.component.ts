import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from 'src/app/core/services/customers.service';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { EditCustomerFields } from './edit-customer.fields';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, AfterViewInit {
  @ViewChild(DynamicFormComponent, { static: false }) customerForm: DynamicFormComponent;
  fields = EditCustomerFields;

  loading = false;

  @Input() customer;

  constructor(
    private activeModal: NgbActiveModal,
    private customersService: CustomersService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.customerForm.setValue( this.customer );
  }

  editCustomer() {
    if ( !this.customerForm.valid ) {
      this.customerForm.validateAllFormFields();
      return;
    }

    const value = this.customerForm.value;
    if ( ! ( typeof value.phone_number === 'string' )  ) {
      value.phone_number = value.phone_number.e164Number;
    }

    this.customersService.updateCustomer( this.customer.id, value ).subscribe(
      data => {
        this.activeModal.close( 'success' );
      }
    );
  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
