import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {
  loading = false;
  page = 0;
  count = 0;

  buyers = [];

  q = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {
    this.route.queryParams.subscribe(
      params => {
        this.page = params.page ? params.page : 1;
        this.q = params.q ? params.q : '';
        this.fetchCustomers( ( this.page - 1 ) * 10 );
      }
    );
  }

  ngOnInit(): void {
  }

  fetchCustomers( offset= 0 ) {
    this.loading = true;
    const q = this.q ? this.q : null;
    this.productsService.fetchBuyers( this.route.parent.snapshot.params.id, offset, q ).subscribe(
      data => {
        this.count = data.count;
        this.buyers = data.results;
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

  searchBuyers( e ) {
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

  goToDetails( customer ) {
    this.router.navigate( [ 'customers', customer.id ] );
  }

}
