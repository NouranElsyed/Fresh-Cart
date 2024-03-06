import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { Product} from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private _ProductService:ProductService,private _Renderer2:Renderer2, private _CartService:CartService, private toastr: ToastrService){}
  products:Product[] =[];
  categories:Category[] =[];
  pageSize:number = 0
  currentPage:number=1
  total:number = 0


ngOnInit(): void {
  this._ProductService.getProduct().subscribe({
    next:(response)=>{
      console.log('products' + response.data)
      this.products = response.data
      this.pageSize =response.metadata.limit
      this.currentPage =response.metadata.currentPage
      this.total =response.metadata.results

      console.log(this.currentPage)
    }
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

pageChanged(event:any):void{
  console.log(event);

}
}
