import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CustomersService } from 'src/app/core/services/customers.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  loading = false;

  customer;

  constructor(
    private customerService: CustomersService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private location: Location,
    private notificationService: NotificationService,
    private modal: NgbModal
  ) {
    this.fetchCustomer();
  }

  ngOnInit(): void {
  }

  fetchCustomer() {
    this.loading = true;
    this.customerService.fetchCustomer( this.route.snapshot.params.id ).subscribe(
      data => {
        this.customer = data;
        this.loading = false;
      }
    );
  }

  editCustomer() {
    const modalRef = this.modal.open(EditCustomerComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.customer = this.customer;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.translateService.get('notificationMessages.customerEditedSuccess').subscribe( message => {
          this.notificationService.success(null, message );
          this.fetchCustomer();
        } );
      }
    }, (_) => { });
  }

  goBack() {
    this.location.back();
  }

}
