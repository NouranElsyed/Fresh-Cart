import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  numOfCartItems:BehaviorSubject<number>=new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient) {
    this.getCartUser().subscribe({
      next:(res)=>{
        this.numOfCartItems.next(res.numOfCartItems)
      }

    })
  }
  baseUrl:string ='https://ecommerce.routemisr.com/api/v1/'

  addToCart(idProduct:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `cart`,
     {productId:idProduct}
     )
    }

    getCartUser():Observable<any>{
      return this._HttpClient.get(this.baseUrl+`cart`

      )
    }

  deleteCartItem(productId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`cart/${productId}`

    )
  }
  countCartItem( countNumber:number ,productId:string):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`cart/${productId}`,
    { count:countNumber}

    )
  }
  clearCartUser():Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`cart`,


    )
  }
  checkOut(cartId:string|null,orderInfo:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+
      `orders/checkout-session/${cartId}?url=http://localhost:3000`,
     {
      shippingAddress:orderInfo
     }
    )
  }


}



