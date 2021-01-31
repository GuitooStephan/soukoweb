import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/core/services/customers.service';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { InformationFields } from './information.fields';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false }) customerForm: DynamicFormComponent;
  fields = InformationFields;

  customer;

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.fetchCustomer();
  }

  ngOnInit(): void {
  }

  fetchCustomer() {
    return this.customersService.fetchCustomer( this.route.parent.snapshot.params.id ).subscribe(
      data => {
        this.customer = data;
        this.customerForm.setValue( this.customer );
      }
    );
  }

}
