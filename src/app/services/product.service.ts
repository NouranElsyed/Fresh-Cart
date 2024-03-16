import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient:HttpClient) { }
  baseUrl:string ='https://ecommerce.routemisr.com/api/v1/'
  getProduct(pageNum:number=1) : Observable<any>{
    return  this._httpClient.get(this.baseUrl + `products?page=${pageNum}`)
    }
  getCategories() : Observable<any>{
      return  this._httpClient.get(this.baseUrl + `categories`)
      }
  getBrands() : Observable<any>{
        return  this._httpClient.get(this.baseUrl + `brands`)
        }
  getDetailsCategory(id:string|null) : Observable<any>{
        return  this._httpClient.get(this.baseUrl + `categories/${id}`)
        }
  getProductDetails(id:string|null) : Observable<any>{
        return  this._httpClient.get(this.baseUrl + `products/${id}`)

  }
}
