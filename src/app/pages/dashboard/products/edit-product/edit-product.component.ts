import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/products.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { EditProductFields } from './edit-product.fields';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DynamicFormComponent, { static: false }) productForm: DynamicFormComponent;
  fields = EditProductFields;

  selectUser$;
  user;

  loading = false;

  @Input() product;

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

  ngAfterViewInit(): void {
    this.productForm.setValue( this.product );
  }

  ngOnDestroy(): void {
    this.selectUser$.unsubscribe();
  }

  editProduct() {
    if ( !this.productForm.valid ) {
      this.productForm.validateAllFormFields();
      return;
    }

    this.loading = true;
    const value = this.productForm.value;
    const formData: FormData = new FormData();

    if ( typeof value.product_picture_url !== 'string'  ) {
      formData.append( 'product_picture_url', value.product_picture_url, value.product_picture_url.name );
    }
    formData.append( 'name', value.name );
    formData.append( 'description', value.description );
    formData.append( 'buying_price', value.buying_price );
    formData.append( 'selling_price', value.selling_price );

    this.productService.editProduct( this.product.id, formData ).subscribe(
      data => {
        this.activeModal.close( 'success' );
      }
    );
  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
