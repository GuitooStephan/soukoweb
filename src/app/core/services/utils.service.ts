import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConstants } from '../constants/api.constants';
import { Observable } from 'rxjs';
  
@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor() { }

    updateQueryStringParameter(uri, key, value) {
        const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        const separator = uri.indexOf('?') !== -1 ? '&' : '?';
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + '=' + value + '$2');
        }
        else {
            return uri + separator + key + '=' + value;
        }
    }
}
