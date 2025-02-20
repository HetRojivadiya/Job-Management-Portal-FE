import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  base = API_ENDPOINTS.BASE;

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.base + url);
  }

  post<T>(
    url: string,
    data: any,
    httpOptions?:
      | HttpHeaders
      | {
          headers?: HttpHeaders;
          observe?: 'body';
          params?: HttpParams;
          reportProgress?: boolean;
          responseType?: 'json';
          withCredentials?: boolean;
        }
  ): Observable<T> {
    return this.http.post<T>(this.base + url, data, {
      ...httpOptions,
      observe: 'body',
    });
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.base + url, data);
  }

  delete<T>(url: string, httpOptions?: { body?: any }): Observable<T> {
    return this.http.delete<T>(this.base + url, {
      ...httpOptions,
      observe: 'body',
    });
  }
}
