import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CustomersService } from 'src/app/core/services/customers.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import * as ICC from 'iso-country-currency';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  q = '';

  loading = false;
  page = 0;
  count = 0;

  products = [];

  selectStore$;
  myStore;
  currency;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customersService: CustomersService,
    private store: Store<AppState>
  ) {
    this.selectStore$ = this.store.pipe( select( selectStore ) )
    .subscribe(
      data => {
        this.myStore = data;
        this.currency = data ? ICC.getAllInfoByISO( data.country ).symbol : null;
      }
    );

    this.route.queryParams.subscribe(
      params => {
        this.page = params.page ? params.page : 1;
        this.q = params.q ? params.q : '';
        this.fetchProducts( ( this.page - 1 ) * 10 );
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectStore$.unsubscribe();
  }

  fetchProducts( offset= 0 ) {
    this.loading = true;
    const q = this.q ? this.q : null;
    this.customersService.fetchProducts( this.route.parent.snapshot.params.id, offset, q ).subscribe(
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

  goToDetails( product ) {
    this.router.navigate( [ 'products', product.id ] );
  }

}
