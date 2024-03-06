import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService, private _CartService:CartService, private toastr: ToastrService){}
  productId:string|null=''
  productDetails:any =null
  ngOnInit(): void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
      this.productId = params.get('id')


    }
    })
    this._ProductService.getProductDetails(this.productId).subscribe({
      next:({data})=>{
        console.log(data);
        this.productDetails = data

      }
    })
  }
  addProduct(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.toastr.success(response.message)

      }
    })
  }

  detailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    autoplayTimeout:1000,
    autoplaySpeed: 1500,
    navSpeed: 600,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
}
