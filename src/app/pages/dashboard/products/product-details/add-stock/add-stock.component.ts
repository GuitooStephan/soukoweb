import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/core/services/products.service';
import { DynamicFormComponent } from 'src/app/shared/dynamic-forms/dynamic-form/dynamic-form.component';
import { AddStockFields } from './add-stock.fields';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false }) stockForm: DynamicFormComponent;
  fields = AddStockFields;

  @Input() productId;

  loading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
  }

  createStock() {
    if ( !this.stockForm.valid ) {
      this.stockForm.validateAllFormFields();
      return;
    }

    this.loading = true;
    this.productsService.createStock( { product_id: this.productId, ...this.stockForm.value } ).subscribe(
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
