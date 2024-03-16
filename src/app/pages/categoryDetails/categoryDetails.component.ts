import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categoryDetails',
  templateUrl: './categoryDetails.component.html',
  styleUrls: ['./categoryDetails.component.css']
})
export class CategoryDetailsComponent  implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute,private toastr:ToastrService,private _CartService:CartService,private _Renderer2:Renderer2, private _ProductService:ProductService ){}
categoryId:string|null=''
categoryDetails:Category={
  name: '',
  image: ''
}
  ngOnInit(): void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
      this.categoryId = params.get('id')
      console.log(this.categoryId)


    }})
  this._ProductService.getDetailsCategory(this.categoryId).subscribe({
    next:(Response)=>{
      console.log(this.categoryDetails);
console.log(this.categoryId);

      this.categoryDetails=Response.data }
    })

  }


addProduct(id:string,element:HTMLButtonElement):void{
  this._Renderer2.setAttribute(element, 'disabled','true')
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      this.toastr.success(response.message)
      this._Renderer2.removeAttribute(element, 'disabled')

    },
    error:(err)=>{
      this._Renderer2.removeAttribute(element, 'disabled')

    }
  })
}
}
