import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConstants } from '../constants/api.constants';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(
        private apiService: ApiService
    ) { }

    fetchCategories(): Observable<any> {
        return this.apiService.get(`${ApiConstants.CATEGORIES_URL}?limit=100`);
    }

}
