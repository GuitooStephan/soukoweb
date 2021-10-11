import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';
import { StoreService } from 'src/app/core/services/store.service';
import { AppState } from 'src/app/core/store/reducers/root.reducers';
import { linewithDataChart } from './data';
import { selectUser } from 'src/app/core/store/selectors/user.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../products/add-product/add-product.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { selectStore } from 'src/app/core/store/selectors/store.selectors';
import * as ICC from 'iso-country-currency';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  selectData$;
  fetchMetrics$;

  ordersMetricsGraph;
  profitMetricsGraph;

  user;
  metrics;

  metricsFilter = '0';

  myStore;
  currency;

  constructor(
    private store: Store<AppState>,
    private storeService: StoreService,
    private modal: NgbModal,
    private translateService: TranslateService,
    private notificationService: NotificationService
  ) {
    this.selectData$ = combineLatest( [
      this.store.pipe( select( selectUser ) ),
      this.store.pipe( select( selectStore ) )
    ] )
    .subscribe(
      ([user, myStore]) => {
        this.user = user;
        this.myStore = myStore;
        this.currency = myStore ? ICC.getAllInfoByISO( myStore.country ).symbol : null;
        this.fetchMetrics();
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectData$.unsubscribe();
    this.fetchMetrics$.unsubscribe();
  }

  fetchMetrics() {
    this.fetchMetrics$ = combineLatest([
      this.storeService.fetchProfitReport( this.user.admin.store_id, this.metricsFilter ),
      this.storeService.fetchStockReport( this.user.admin.store_id, this.metricsFilter ),
      this.storeService.fetchOrdersReport( this.user.admin.store_id, this.metricsFilter )
    ]).subscribe(
      ([ profitReport, stockReport, ordersReport ]) => {
        this.metrics = {
          profitReport,
          stockReport,
          ordersReport
        };
        this.generateGraphsForExport();
      }
    );
  }

  generateGraphsForExport() {
    combineLatest([
      this.translateService.get('dashboardContent.profit'),
      this.translateService.get('dashboardContent.orders')
    ]).subscribe( ([profit, orders]) => {
      this.ordersMetricsGraph = null;
      const ordersMetricsGraph = { ...linewithDataChart };
      ordersMetricsGraph.series = [];
      ordersMetricsGraph.xaxis.categories = [];
      setTimeout( () => {
        ordersMetricsGraph.series.push( { name: orders, data: this.metrics.ordersReport.orders_record.map( _o => _o.orders ) } );
        ordersMetricsGraph.xaxis.categories.push( ...this.metrics.ordersReport.orders_record.map( d => d.date ) );
        this.ordersMetricsGraph = ordersMetricsGraph;
      }, 1000 );

      this.profitMetricsGraph = null;
      const profitMetricsGraph = { ...linewithDataChart };
      profitMetricsGraph.series = [];
      profitMetricsGraph.xaxis.categories = [];
      setTimeout( () => {
        profitMetricsGraph.series.push( { name: profit, data: this.metrics.profitReport.profit_report.map( _o => _o.profit ) } );
        profitMetricsGraph.xaxis.categories.push( ...this.metrics.profitReport.profit_report.map( d => d.date ) );
        this.profitMetricsGraph = profitMetricsGraph;
      }, 1000 );
    });
  }

  addProduct() {
    const modalRef = this.modal.open(AddProductComponent, { centered: true, size: 'lg' });
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.translateService.get('notificationMessages.productAddedSuccess').subscribe( message => {
          this.notificationService.success(null, message );
        } );
      }
    }, (_) => { });
  }

}
