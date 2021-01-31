import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/core/services/customers.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  form: FormGroup;

  loading = false;
  page = 0;
  count = 0;

  products = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customersService: CustomersService,
    private fb: FormBuilder
  ) {
    this.setupForm();

    this.route.queryParams.subscribe(
      params => {
        this.page = params.page ? params.page : 1;
        this.fetchProducts( ( this.page - 1 ) * 10 );
      }
    );
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

  ngOnInit(): void {
  }

  fetchProducts( offset= 0, q= null ) {
    this.loading = true;
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

  goToDetails( product ) {
    this.router.navigate( [ 'products', product.id ] );
  }

}
