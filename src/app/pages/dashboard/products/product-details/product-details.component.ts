import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { ConfirmPromptComponent } from 'src/app/shared/prompts/confirm-prompt/confirm-prompt.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product;

  loading = false;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private productsService: ProductsService
  ) {
    this.fetchProduct();
  }

  ngOnInit(): void {
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
