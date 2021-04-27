import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConstants } from '../constants/api.constants';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(
        private apiService: ApiService
    ) { }

    createStore(payload): Observable<any> {
        return this.apiService._post(`${ApiConstants.STORE_URL}`, payload);
    }

    fetchStore( storeId ): Observable<any> {
        return this.apiService.get( `${ApiConstants.STORE_URL}${storeId}/` );
    }

    fetchStoreForCustomers( storeId ): Observable<any> {
        return this.apiService.get( `${ApiConstants.CUSTOMERS_URL}store/${storeId}/` );
    }

    fetchProfitReport( storeId, period ): Observable<any> {
        return this.apiService.get( `${ApiConstants.STORE_URL}${storeId}/profit-report/?period=${period}` );
    }

    fetchOrdersReport( storeId, period ): Observable<any> {
        return this.apiService.get( `${ApiConstants.STORE_URL}${storeId}/orders-report/?period=${period}` );
    }

    fetchStockReport( storeId, period ): Observable<any> {
        return this.apiService.get( `${ApiConstants.STORE_URL}${storeId}/stock-report/?period=${period}` );
    }

    updateStore( storeId, payload ): Observable<any> {
        return this.apiService.put( `${ApiConstants.STORE_URL}${storeId}/`, payload );
    }

    updateLogo( storeId, payload ): Observable<any> {
        return this.apiService._put( `${ApiConstants.STORE_URL}${storeId}/`, payload );
    }

    fetchSubscriptionPlans(): Observable<any> {
        return this.apiService.get( `${ApiConstants.PLANS_URL}` );
    }

}
