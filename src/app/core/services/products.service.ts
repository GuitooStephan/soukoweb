import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConstants } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(
        private apiService: ApiService,
        private utilsService: UtilsService
    ) { }

    addProduct(payload): Observable<any> {
        return this.apiService._post(`${ApiConstants.PRODUCTS_URL}`, payload);
    }

    editProduct( productId, payload ): Observable<any> {
        return this.apiService._put( `${ApiConstants.PRODUCTS_URL}${productId}/`, payload );
    }

    deleteProduct( productId ): Observable<any> {
        return this.apiService.delete( `${ApiConstants.PRODUCTS_URL}${productId}/` );
    }

    searchProducts( storeId, q, limit= 10 ): Observable<any> {
        return this.apiService.get( `${ApiConstants.STORE_URL}${storeId}/${ApiConstants.PRODUCTS_URL}?search=${q}` );
    }

    fetchProducts( storeId, offset= 0, q= null, limit= 10 ): Observable<any> {
        let url = `${ApiConstants.STORE_URL}${storeId}/products/?offset=${offset}&limit=${limit}`;
        if ( q ) {
            url = this.utilsService.updateQueryStringParameter( url, 'search', q );
        }
        return this.apiService.get( url );
    }

    fetchProduct( productId ): Observable<any> {
        return this.apiService.get( `${ApiConstants.PRODUCTS_URL}${productId}/` );
    }


    fetchStocks( productId, offset= 0 ): Observable<any> {
        return this.apiService.get( `${ApiConstants.PRODUCTS_URL}${productId}/stocks/?offset=${offset}&limit=10` );
    }

    deleteStock( stockId ): Observable<any> {
        return this.apiService.delete( `${ApiConstants.STOCKS_URL}${stockId}/` );
    }

    createStock( payload ): Observable<any> {
        return this.apiService.post( `${ApiConstants.STOCKS_URL}`, payload );
    }


    fetchBuyers( productId, offset= 0, q= null ): Observable<any> {
        let url = `${ApiConstants.PRODUCTS_URL}${productId}/customers/?offset=${offset}&limit=10`;
        if ( q ) {
            url = this.utilsService.updateQueryStringParameter( url, 'search', q );
        }
        return this.apiService.get( url );
    }

    fetchProductsForCustomers( storeId, offset= 0, q= null, limit= 10 ): Observable<any> {
        let url = `${ApiConstants.CUSTOMERS_URL}store/${storeId}/products/?offset=${offset}&limit=${limit}`;
        if ( q ) {
            url = this.utilsService.updateQueryStringParameter( url, 'search', q );
        }
        return this.apiService.get( url );
    }

}
