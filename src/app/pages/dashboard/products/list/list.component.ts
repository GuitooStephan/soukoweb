import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import { ConfirmPromptComponent } from 'src/app/shared/prompts/confirm-prompt/confirm-prompt.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import * as ICC from 'iso-country-currency';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  form: FormGroup;

  loading = false;
  products = [];
  page = 0;
  count = 0;

  selectUser$;
  user;
  myStore;
  currency;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private modal: NgbModal,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.setupForm();

    this.selectUser$ = combineLatest([
      this.route.queryParams,
      this.store.pipe( select( selectUser ) ),
      this.store.pipe( select( selectStore ) )
    ]).subscribe(
      ([params, user, myStore]) => {
        this.user = user;
        this.myStore = myStore;
        this.currency = myStore ? ICC.getAllInfoByISO( myStore.country ).symbol : null;
        this.page = params.page ? params.page : 1;
        this.fetchProducts( ( this.page - 1 ) * 10 );
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectUser$.unsubscribe();
  }

  setupForm() {
    this.form = this.fb.group({
      q: [ '' ]
    });

    this.form.get( 'q' ).valueChanges.subscribe(
      data => {
        if ( data ) {
          this.fetchProducts( 0, data.trim() );
        } else {
          this.fetchProducts( 0 );
        }
      }
    );
  }

  fetchProducts( offset, q=null ) {
    this.loading = true;
    this.productsService.fetchProducts(
      this.user.admin.store_id,
      offset,
      q
    ).subscribe(
      data => {
        this.count = data.count;
        this.products = data.results;
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

  addProduct() {
    const modalRef = this.modal.open(AddProductComponent, { centered: true, size: 'lg' });
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Product added successfully!');
        this.fetchProducts(0);
      }
    }, (_) => { });
  }

  editProduct( product ) {
    const modalRef = this.modal.open(EditProductComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.product = product;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Product edited successfully!');
        this.fetchProducts(0);
      }
    }, (_) => { });
  }

  promptForDeletingProduct( product ): void {
    const dialogRef = this.dialog.open(ConfirmPromptComponent, {
      width: '500px',
      data: {title: `Would you like to delete this product: ${product.name}`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.productsService.deleteProduct( product.id ).subscribe(
          data => {
            this.notificationService.success( null, 'Product deleted successfully' );
            this.fetchProducts( 0 );
          }
        );
      }
    });
  }

  goToDetails( product ) {
    this.router.navigate( [ 'products', product.id ] );
  }

}
