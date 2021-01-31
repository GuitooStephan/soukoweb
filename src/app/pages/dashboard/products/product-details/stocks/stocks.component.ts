import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ConfirmPromptComponent } from 'src/app/shared/prompts/confirm-prompt/confirm-prompt.component';
import { AddStockComponent } from '../add-stock/add-stock.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stocks = [];

  loading = false;
  page = 0;
  count = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private productsService: ProductsService
  ) {
    this.route.queryParams.subscribe(
      params => {
        this.page = params.page ? params.page : 1;
        this.fetchStocks( ( this.page - 1 ) * 10 );
      }
    );
  }

  ngOnInit(): void {
  }

  fetchStocks( offset= 0 ) {
    this.loading = true;
    this.productsService.fetchStocks( this.route.parent.snapshot.params.id, offset ).subscribe(
      data => {
        this.count = data.count;
        this.stocks = data.results;
        this.loading = false;
      }
    );
  }

  createStock() {
    const modalRef = this.modal.open(AddStockComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.productId = this.route.parent.snapshot.params.id;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Stock added successfully!');
        this.fetchStocks(0);
      }
    }, (_) => { });
  }

  promptForDeletingProduct( stock ): void {
    const dialogRef = this.dialog.open(ConfirmPromptComponent, {
      width: '500px',
      data: {title: `Would you like to delete this stock`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.productsService.deleteStock( stock.id ).subscribe(
          data => {
            this.notificationService.success( null, 'Stock deleted.' );
            this.fetchStocks( 0 );
          }
        );
      }
    });
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
