import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConstants } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {
    constructor(
        private apiService: ApiService,
        private utilsService: UtilsService
    ) { }

    fetchStoreCustomers(storeId, offset= 0, limit= 10): Observable<any> {
        return this.apiService.get(`${ApiConstants.STORE_URL}${storeId}/${ApiConstants.CUSTOMERS_URL}?offset=${offset}&limit=${limit}`);
    }

    searchStoreCustomers(storeId, q, limit=10): Observable<any> {
        return this.apiService.get(`${ApiConstants.STORE_URL}${storeId}/${ApiConstants.CUSTOMERS_URL}?search=${q}&limit=${limit}`);
    }

    createCustomer( payload ): Observable<any> {
        return this.apiService.post( `${ApiConstants.CUSTOMERS_URL}`, payload );
    }

    getStoreCustomers( storeId, offset= 0, q= null, limit= 10 ): Observable<any> {
        let url = `${ApiConstants.STORE_URL}${storeId}/customers/?offset=${offset}&limit=${limit}`;
        if ( q ) {
            url = this.utilsService.updateQueryStringParameter( url, 'search', q );
        }
        return this.apiService.get( url );
    }

    fetchCustomer( customerId ): Observable<any> {
        return this.apiService.get( `${ApiConstants.CUSTOMERS_URL}${customerId}/` );
    }

    updateCustomer( customerId, payload ): Observable<any> {
        return this.apiService.put( `${ApiConstants.CUSTOMERS_URL}${customerId}/`, payload );
    }

    deleteCustomer( customerId ): Observable<any> {
        return this.apiService.delete( `${ApiConstants.CUSTOMERS_URL}${customerId}/` );
    }

    fetchOrders( customerId, offset= 0, q= null, payment_status= null, confirmed=null ) {
        let url = `${ApiConstants.CUSTOMERS_URL}${customerId}/orders/?offset=${offset}&limit=10`;
        if ( q ) {
            url = this.utilsService.updateQueryStringParameter( url, 'search', q );
        }
        if ( payment_status ) {
            url = this.utilsService.updateQueryStringParameter( url, 'payment_status', payment_status );
        }
        if ( confirmed !== null ) {
            url = this.utilsService.updateQueryStringParameter( url, 'confirmed', confirmed );
        }
        return this.apiService.get( url );
    }

    fetchProducts( customerId, offset= 0, q= null, limit= 10 ) {
        let url = `${ApiConstants.CUSTOMERS_URL}${customerId}/ordered-products/?offset=${offset}&limit=${limit}`;
        if ( q ) {
            url = this.utilsService.updateQueryStringParameter( url, 'search', q );
        }
        return this.apiService.get( url );
    }

    placeOrderAnonymous( storeId, payload ): Observable<any> {
        return this.apiService.post( `${ApiConstants.CUSTOMERS_URL}store/${storeId}/orders/place-order/`, payload );
    }

    resendOrderConfirmationCode( storeId, payload ): Observable<any> {
        return this.apiService.post( `${ApiConstants.CUSTOMERS_URL}store/${storeId}/orders/resend-order-confirmation-code`, payload );
    }

}
