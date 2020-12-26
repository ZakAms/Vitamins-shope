import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IProduct, ICustomer, IOrder, IState, IPagedResults, IApiResponse } from '../../shared/interfaces';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class DataService {
    baseUrl = this.utilitiesService.getApiUrl();
    productsBaseUrl = this.baseUrl + '/api/products';

    constructor(private http: HttpClient, private utilitiesService: UtilitiesService) {  }


    getProductsPage(page: number, pageSize: number): Observable<IPagedResults<IProduct[]>> {
      return this.http.get<IProduct[]>(
          `${this.productsBaseUrl}/page/${page}/${pageSize}`,
          { observe: 'response' })
          .pipe(
              map(res => {
                  const totalRecords = +res.headers.get('X-InlineCount');
                  const products = res.body as IProduct[];

                  return {
                      results: products,
                      totalRecords: totalRecords
                  };
              }),
              catchError(this.handleError)
          );
    }

    getProducts(): Observable<IProduct[]> {
      return this.http.get<IProduct[]>(this.productsBaseUrl)
          .pipe(
              map(products => {
                  return products;
              }),
              catchError(this.handleError)
          );
  }

    getProduct(id: number): Observable<IProduct> {
      return this.http.get<IProduct>(this.productsBaseUrl + '/' + id)
          .pipe(
              map(product => {
                return product;
              }),
              catchError(this.handleError)
          );
  }


    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

}
