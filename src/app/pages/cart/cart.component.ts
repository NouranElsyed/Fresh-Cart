import { Component, OnInit, Renderer2 } from '@angular/core';
import { elementAt } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService, private _Renderer2:Renderer2 ){}
  cart:any={}
  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next:(Response)=>{
        console.log(Response);
        this.cart = Response.data
      }
    })

      }
  removeItem(productId:string, element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disable','true')
    this._CartService.deleteCartItem(productId).subscribe({
      next:(response)=>{
        console.log(response);
      this._CartService.numOfCartItems.next(response.numOfCartItems)

        this.cart =  response.data
    this._Renderer2.removeAttribute(element,'disable')

      },error:(err)=>{
        this._Renderer2.removeAttribute(element,'disable')

      }
    })
    console.log('delete');

  }
  changeCount(countNumber:number, productId:string, minus:HTMLButtonElement , plus:HTMLButtonElement):void{
    if(countNumber >= 1){
    this._Renderer2.setAttribute(minus,'disable','true')
    this._Renderer2.setAttribute(plus,'disable','true')

      this._CartService.countCartItem(countNumber, productId).subscribe({
        next:(response)=>{
          this.cart= response.data
          console.log(this._CartService);


        this._Renderer2.removeAttribute(minus,'disable')
        this._Renderer2.removeAttribute(plus,'disable')

      }, error:(error)=>{
        this._Renderer2.removeAttribute(minus,'disable')
        this._Renderer2.removeAttribute(plus,'disable')



      }
    })

}else{
  console.log('remove');

}
  }
clear():void{

    this._CartService.clearCartUser().subscribe({
      next:(response)=>{
        console.log(response);
        this.cart =  response.data
      this._CartService.numOfCartItems.next(response.numOfCartItems)

      }
    })
    console.log('delete');

  }

}
