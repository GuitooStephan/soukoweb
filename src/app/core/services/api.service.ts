import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private httpWithoutInterceptor: HttpClient;

    constructor(
        private http: HttpClient,
        private httpBackend: HttpBackend,
        private jwtService: JwtService
    ) {
        this.httpWithoutInterceptor = new HttpClient(httpBackend);
    }

    get(path: string, params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders()): Observable<any> {
        return this.http.get(`${path}`, { params, headers });
    }

    put(path: string, body: object = {}): Observable<any> {
        return this.http.put(`${path}`, JSON.stringify(body));
    }

    post(path: string, body: object = {}): Observable<any> {
        return this.http.post(`${path}`, JSON.stringify(body));
    }

    delete(path): Observable<any> {
        return this.http.delete(`${path}`);
    }

    request(method, path, body) {
        return this.http.request(method, path, { body: JSON.stringify(body) });
    }

    _post(path: string, body): Observable<any> {
        return this.httpWithoutInterceptor.post(
            `${environment.base_url}${path}`,
            body,
            { headers: new HttpHeaders( {
                Authorization: `Token ${this.jwtService.getToken()}`
            } ) }
        );
    }

    _put(path: string, body): Observable<any> {
        return this.httpWithoutInterceptor.put(
            `${environment.base_url}${path}`,
            body,
            { headers: new HttpHeaders( {
                Authorization: `Token ${this.jwtService.getToken()}`
            } ) }
        );
    }

    _getCSV(path: string): Observable<any> {
        return this.httpWithoutInterceptor.get(
            `${environment.base_url}${path}`,
            { headers: new HttpHeaders( {
                Authorization: `Token ${this.jwtService.getToken()}`,
                'Content-Type': 'text/csv'
            } ), responseType: 'text' }
        );
    }

}
