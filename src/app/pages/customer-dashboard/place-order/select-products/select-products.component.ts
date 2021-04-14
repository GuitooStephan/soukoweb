import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { StoreService } from 'src/app/core/services/store.service';
import * as ICC from 'iso-country-currency';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ConfirmOrderComponent } from '../confirm-order/confirm-order.component';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { select, Store } from '@ngrx/store';
import { selectCart } from 'src/app/core/store/selectors/cart.selectors';
import * as CartActions from 'src/app/core/store/actions/cart.actions';
import { NotificationService } from 'src/app/core/services/notification.service';

declare var $;
declare var _;

@Component({
  selector: 'app-select-products',
  templateUrl: './select-products.component.html',
  styleUrls: ['./select-products.component.css']
})
export class SelectProductsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private storeService: StoreService,
    private notificationService: NotificationService,
    private productsService: ProductsService,
    private modalService: NgbModal
  ) {
    this.route.queryParams.subscribe( params => {
      this.page = params.page ? params.page : 1;
      this.q = params.q ? params.q : '';
      this.fetchData( ( this.page - 1 ) * 10 );
    } );
  }

  @ViewChild( 'storeInfoDiv' ) storeInfoDiv;
  @ViewChild( 'topBarStoreInfoDiv' ) topBarStoreInfoDiv;
  @ViewChild( 'navbarDiv' ) navbarDiv;

  myStore;

  fetchData$;

  page = 0;
  count = 0;
  loading = false;

  products = [];
  selectedProducts = [];

  q = '';
  currency;

  orderId;
  customerIsVerified;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    // tslint:disable-next-line: max-line-length
    const storeInfoDivHeight = ( this.storeInfoDiv.nativeElement.scrollHeight - Math.abs( this.storeInfoDiv.nativeElement.scrollTop ) ) + 30;
    if ( storeInfoDivHeight <= window.pageYOffset ) {
      this.navbarDiv.nativeElement.classList.remove( 'justify-content-end' );
      this.topBarStoreInfoDiv.nativeElement.classList.add( 'd-flex' );
    } else {
      this.navbarDiv.nativeElement.classList.add( 'justify-content-end' );
      this.topBarStoreInfoDiv.nativeElement.classList.remove( 'd-flex' );
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.fetchData$.unsubscribe();
  }

  fetchData( offset ) {
    this.loading = true;
    const q = this.q ? this.q : null;
    this.fetchData$ = combineLatest( [
      this.storeService.fetchStoreForCustomers( this.route.snapshot.params.id ),
      this.productsService.fetchProductsForCustomers( this.route.snapshot.params.id, offset, q, 15 )
    ] ).subscribe( ( [ store, data ] ) => {
      this.myStore = store;
      this.currency = store ? ICC.getAllInfoByISO( store.country ).symbol : null;
      this.count = data.count;
      this.products = data.results.map( d => ({ data: { ...d }, selected: _.some( this.selectedProducts, p => p.product.id === d.id ) }) );
      this.loading = false;
      this.selectCart();
      setTimeout( () => {
        this.initializeColcade();
      }, 500 );
    }, error => {
      this.notificationService.error( null, 'Store does not exist, kindly contact the store manager.' );
      this.router.navigate( ['/'] );
    } );
  }

  selectCart() {
    this.store.pipe( select( selectCart ) ).subscribe( cart => {
      this.selectedProducts = cart;
      this.products.forEach( ( p, i) => {
        this.products[i].selected = _.some( this.selectedProducts, p => p.product.id === this.products[i].data.id );
      });
    } );
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

  placeOrder() {
    const componentInstance = this.modalService.open( ConfirmOrderComponent, { centered: true, size: 'lg' } );
    componentInstance.componentInstance.currency = this.currency;
    componentInstance.componentInstance.myStore = this.myStore;
    componentInstance.componentInstance.products = this.selectedProducts;
    componentInstance.componentInstance.getOrder.subscribe( result => {
      this.orderId = result.order.id;
      this.customerIsVerified = result.customer_is_verified;
    } );
    componentInstance.result.then((result) => {
      if (result && result === 'success') {
        this.store.dispatch( CartActions.emptyCart() );
        if ( this.customerIsVerified ) {
          this.router.navigate( [ '/customer/confirm-order', this.myStore.id, 'success' ] );
        } else {
          this.router.navigate( [ '/customer/place-order', this.myStore.id, 'confirmation-prompt', this.orderId ] );
        }
      }
    }, (_) => { });
  }

  viewProduct( p ) {
    const i = _.findIndex( this.products, _p => _p.data.id === p.data.id );
    const componentInstance = this.modalService.open( ProductDetailsComponent, { centered: true, size: 'lg' } );
    componentInstance.componentInstance.product = { ...this.products[i].data };
    componentInstance.componentInstance.currency = this.currency;
  }

  searchProducts( e ) {
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

  selectProduct( p ) {
    const i = _.findIndex( this.products, _p => _p.data.id === p.data.id );
    this.products[ i ].selected = !this.products[ i ].selected;

    this.addProductToCart( i );
    this.removeProductFromCart( i );
  }

  addProductToCart( i ) {
    if ( this.products[ i ].selected && !_.some( this.selectedProducts, p => p.product.id === this.products[i].data.id ) ) {
      this.store.dispatch( CartActions.addProduct( { data: { product: this.products[ i ].data } } ) );
    }
  }

  removeProductFromCart( i ) {
    if ( !this.products[ i ].selected ) {
      this.store.dispatch( CartActions.removeProduct( { data: { id: this.products[ i ].data.id } } ) );
    }
  }

  initializeColcade() {
    $('.grid').colcade({
      columns: '.grid-col',
      items: '.grid-item'
    });
  }

}
