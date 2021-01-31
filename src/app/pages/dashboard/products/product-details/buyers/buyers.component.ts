import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {
  form: FormGroup;

  loading = false;
  page = 0;
  count = 0;

  buyers = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {
    this.setupForm();
    this.route.queryParams.subscribe(
      params => {
        this.page = params.page ? params.page : 1;
        this.fetchCustomers( ( this.page - 1 ) * 10 );
      }
    );
  }

  ngOnInit(): void {
  }

  setupForm() {
    this.form = this.fb.group({
      q: ['']
    });

    this.form.get( 'q' ).valueChanges.subscribe(
      data => {
        if ( data ) {
          this.fetchCustomers( 0, data.trim() );
        } else {
          this.fetchCustomers( 0 );
        }
      }
    );
  }

  fetchCustomers( offset= 0, q= null ) {
    this.loading = true;
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

}
