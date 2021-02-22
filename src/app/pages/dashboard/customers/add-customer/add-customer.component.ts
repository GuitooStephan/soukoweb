import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { CustomersService } from 'src/app/core/services/customers.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { AddCustomerFields } from './add-customer.fields';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicFormComponent, { static: false }) customerForm: DynamicFormComponent;
  fields = AddCustomerFields;

  selectUser$;
  user;

  loading = false;

  constructor(
    private router: Router,
    private activeModal: NgbActiveModal,
    private customersService: CustomersService,
    private store: Store<AppState>
  ) {
    this.selectUser$ = this.store.pipe( select( selectUser ) )
    .pipe( first() )
    .subscribe(
      user => {
        this.user = user;
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectUser$.unsubscribe();
  }

  createCustomer() {
    if ( !this.customerForm.valid ) {
      this.customerForm.validateAllFormFields();
      return;
    }

    const value = this.customerForm.value;
    if ( ! ( typeof value.phone_number === 'string' )  ) {
      value.phone_number = value.phone_number.e164Number;
    }

    this.loading = true;
    this.customersService.createCustomer( { store_id: this.user.admin.store_id, ...value } ).subscribe(
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
