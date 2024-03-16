import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _httpClient:HttpClient) { }
  baseUrl:string ='https://ecommerce.routemisr.com/api/v1/'
  addToWishlist(productId:string) : Observable<any>{
    return  this._httpClient.post(this.baseUrl + `wishlist`,
    {
      productId: productId
    }
    )}
  getWishList(): Observable<any>{
    return  this._httpClient.get(this.baseUrl + `wishlist`)

  }
  removeFromWishList(productId:string): Observable<any>{
    return  this._httpClient.delete(this.baseUrl + `wishlist/${productId}`)


  }
}
