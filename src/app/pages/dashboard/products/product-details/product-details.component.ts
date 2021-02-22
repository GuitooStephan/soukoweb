import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import { ConfirmPromptComponent } from 'src/app/shared/prompts/confirm-prompt/confirm-prompt.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import * as ICC from 'iso-country-currency';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product;

  loading = false;

  selectStore$;
  myStore;
  currency;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private productsService: ProductsService
  ) {
    this.selectStore$ = this.store.pipe( select( selectStore ) )
    .subscribe( myStore => {
      this.myStore = myStore;
      this.currency = myStore ? ICC.getAllInfoByISO( myStore.country ).symbol : null;
      this.fetchProduct();
    } );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectStore$.unsubscribe();
  }

  fetchProduct() {
    this.loading = true;
    this.productsService.fetchProduct( this.route.snapshot.params.id ).subscribe(
      data => {
        this.product = data;
        this.loading = false;
      }
    );
  }

  editProduct() {
    const modalRef = this.modal.open(EditProductComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.product = this.product;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Product edited successfully!');
        this.fetchProduct();
      }
    }, (_) => { });
  }

  promptForDeletingProduct(): void {
    const dialogRef = this.dialog.open(ConfirmPromptComponent, {
      width: '500px',
      data: {title: `Would you like to delete this product: ${this.product.name}`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.productsService.deleteProduct( this.product.id ).subscribe(
          data => {
            this.notificationService.success( null, 'Product deleted successfully' );
            this.router.navigate( ['/products/list'] );
          }
        );
      }
    });
  }

}
