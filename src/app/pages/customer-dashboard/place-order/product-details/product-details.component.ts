import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import * as CartActions from 'src/app/core/store/actions/cart.actions';
import { selectCart } from 'src/app/core/store/selectors/cart.selectors';

declare var _;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product;
  @Input() currency;
  @Output() toggleProductFromCart: EventEmitter<any> = new EventEmitter<any>();

  selectedProducts = [];

  added = false;

  constructor(
    private activeModal: NgbActiveModal,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.pipe( select( selectCart ) ).subscribe( cart => {
      this.selectedProducts = cart;
      this.added = _.some( this.selectedProducts, p => p.product.id === this.product.id );
    } );
  }

  addToCart() {
    this.store.dispatch( CartActions.addProduct( { data: { product: this.product } } ) );
  }

  removeFromCart() {
    this.store.dispatch( CartActions.removeProduct( { data: { id: this.product.id } } ) );
  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
