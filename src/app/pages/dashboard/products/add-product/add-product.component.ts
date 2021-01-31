import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/products.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { AddProductFields } from './add-product.fields';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicFormComponent, { static: false }) productForm: DynamicFormComponent;
  fields = AddProductFields;

  selectUser$;
  user;

  loading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private store: Store<AppState>,
    private productService: ProductsService
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

  addProduct() {
    if ( !this.productForm.valid ) {
      this.productForm.validateAllFormFields();
      return;
    }

    this.productService.addProduct( { store_id: this.user.admin.store_id, ...this.productForm.value } ).subscribe(
      data => {
        this.activeModal.close( 'success' );
      }
    );
  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
