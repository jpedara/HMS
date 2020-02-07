import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  
  private apiServer = "http://localhost:3000";

  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiServer+"/products/",this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createProduct(product):Observable<Product>{
    return this.http.post<Product>(this.apiServer+"/products/",JSON.stringify(product),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  updateProduct(id,product):Observable<Product>{
    return this.http.put<Product>(this.apiServer+"/products/"+id,JSON.stringify(product),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )

  }

  getProduct(id):Observable<Product>{
    return this.http.get<Product>(this.apiServer+"/products/"+id,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteProduct(id):Observable<Product>{

    return this.http.delete<Product>(this.apiServer+"/products/"+id,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
