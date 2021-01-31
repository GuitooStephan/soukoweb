import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ConfirmPromptComponent } from 'src/app/shared/prompts/confirm-prompt/confirm-prompt.component';
import { RecordPaymentComponent } from '../record-payment/record-payment.component';

declare var _: any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order;
  loading = false;

  cost = 0;
  percentage = 0.00;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private modal: NgbModal,
    private dialog: MatDialog,
    private ordersService: OrdersService
  ) {
    this.fetchOrder();
  }

  ngOnInit(): void {
  }

  fetchOrder() {
    this.loading = true;
    this.ordersService.fetchOrder( this.route.snapshot.params.id ).subscribe(
      data => {
        this.order = data;
        this.cost = _.sumBy(data.payments, o => parseFloat( o.amount ) || 0.00);
        this.percentage = this.cost / parseFloat( this.order.total_amount ) ;
        this.loading = false;
      }
    );
  }

  recordPayment() {
    const modalRef = this.modal.open(RecordPaymentComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.orderId = this.route.snapshot.params.id;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.notificationService.success(null, 'Payment recorded successfully!');
        this.fetchOrder();
      }
    }, (_) => { });
  }

  promptForDeletingOrder(): void {
    const dialogRef = this.dialog.open(ConfirmPromptComponent, {
      width: '500px',
      data: {title: `Would you like to delete the order of : ${this.order.customer.first_name} ${this.order.customer.last_name}`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.ordersService.deleteOrder( this.order.id ).subscribe(
          data => {
            this.notificationService.success( null, 'Order deleted successfully' );
            this.router.navigate( [ '/orders/list' ] );
          }
        );
      }
    });
  }

}
