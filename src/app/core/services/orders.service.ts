import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConstants } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(
        private apiService: ApiService,
        private utilsService: UtilsService
    ) { }

    createOrder(payload): Observable<any> {
        return this.apiService.post(`${ApiConstants.ORDERS_URL}`, payload);
    }

    updateOrder( orderId, payload ): Observable<any> {
        return this.apiService.put( `${ApiConstants.ORDERS_URL}${orderId}/`, payload );
    }

    deleteOrder( orderId ): Observable<any> {
        return this.apiService.delete( `${ApiConstants.ORDERS_URL}${orderId}` );
    }

    createOrderItem(payload): Observable<any> {
        return this.apiService.post(`${ApiConstants.ORDER_ITEMS_URL}`, payload);
    }

    updateOrderItem( id, payload ): Observable<any> {
        return this.apiService.put( `${ApiConstants.ORDER_ITEMS_URL}${id}/`, payload );
    }

    deleteOrderItem( id ): Observable<any> {
        return this.apiService.delete( `${ApiConstants.ORDER_ITEMS_URL}${id}/` );
    }

    fetchOrder( orderId ): Observable<any> {
        return this.apiService.get( `${ApiConstants.ORDERS_URL}${orderId}/` );
    }

    fetchOrders( storeId, offset= 0, q= null, payment_status= null ) {
        let url = `${ApiConstants.STORE_URL}${storeId}/orders/?offset=${offset}&limit=10`;
        if ( q ) {
            url = this.utilsService.updateQueryStringParameter( url, 'search', q );
        }
        if ( payment_status ) {
            url = this.utilsService.updateQueryStringParameter( url, 'payment_status', payment_status );
        }
        return this.apiService.get( url );
    }

    recordPayment( payload ): Observable<any> {
        return this.apiService.post( `${ApiConstants.PAYMENTS_URL}`, payload );
    }

}
