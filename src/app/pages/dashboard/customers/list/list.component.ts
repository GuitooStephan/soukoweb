import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { CustomersService } from 'src/app/core/services/customers.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import { ConfirmPromptComponent } from 'src/app/shared/prompts/confirm-prompt/confirm-prompt.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  selectUser$;
  user;

  page = 0;
  count = 0;
  customers = [];

  loading = false;

  q = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private customerService: CustomersService
  ) {
    this.selectUser$ = combineLatest([
      this.route.queryParams,
      this.store.pipe( select( selectUser ) )
    ]).subscribe(
      ([params, user]) => {
        this.user = user;
        this.page = params.page ? params.page : 1;
        this.q = params.q ? params.q : '';
        this.fetchCustomers( ( this.page - 1 ) * 10 );
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectUser$.unsubscribe();
  }

  fetchCustomers( offset ) {
    this.loading = true;
    const q = this.q ? this.q : null;
    this.customerService.getStoreCustomers(
      this.user.admin.store_id,
      offset,
      q
    ).subscribe(
      data => {
        this.count = data.count;
        this.customers = data.results;
        this.loading = false;
      }
    );
  }

  fetchPage( newPage ) {
    newPage = newPage === 1 ? null : newPage;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { page: newPage },
        queryParamsHandling: 'merge'
      }
    );
  }

  searchCustomers( e ) {
    if ( ( e.keyCode === 8 || e.keyCode === 46 ) && this.q === '' ) {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { page: null, q: null },
          queryParamsHandling: 'merge'
        }
      );
    }

    if ( e.keyCode === 13 ) {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { page: null, q: this.q },
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  createCustomer() {
    const modalRef = this.modal.open(AddCustomerComponent, { centered: true, size: 'lg' });
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Customer created successfully!');
        this.fetchCustomers(0);
      }
    }, (_) => { });
  }

  editCustomer( customer ) {
    const modalRef = this.modal.open(EditCustomerComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.customer = customer;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Customer edited successfully!');
        this.fetchCustomers(0);
      }
    }, (_) => { });
  }

  goToDetails( customer ) {
    this.router.navigate( [ '/dashboard/customers', customer.id ] );
  }

}
