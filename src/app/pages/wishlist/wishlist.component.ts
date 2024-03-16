import { Component, OnInit } from '@angular/core';
import { WishListService } from 'src/app/services/wish-list.service';
import  { Product} from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  products:Product[] =[];
  wishListData:string[]=[];

  constructor(private _WishListService:WishListService,private _CartService:CartService, private toastr: ToastrService){}
  ngOnInit(): void {
    this._WishListService.getWishList().subscribe({
    next:(response)=>{
      this.products = response.data
    }

    })
  }

  reomveWish(prodId:string):void{
    this._WishListService.removeFromWishList(prodId).subscribe({
      next:(response)=>{
        this.toastr.success(response.message)
        this.wishListData = response.data
      const newWishList = this.products.filter((item)=>this.wishListData.includes(item._id))
      this.products  = newWishList
      }})
  }
  addProduct(id:string,element:HTMLButtonElement):void{

    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._CartService.numOfCartItems.next(response.numOfCartItems)
        this.toastr.success(response.message)
        this.wishListData = response.data

      },
      error:(err)=>{
        console.log('error')


      }
    })
  }
}
