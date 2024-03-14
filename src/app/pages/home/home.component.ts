import { Component, OnInit, Renderer2 } from '@angular/core';
import { error } from '@rxweb/reactive-form-validators';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { Product} from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
term: string ='';

  constructor(private _ProductService:ProductService,private _Renderer2:Renderer2, private _CartService:CartService, private toastr: ToastrService){}
  products:Product[] =[];
  categories:Category[] =[];

ngOnInit(): void {
  this._ProductService.getProduct().subscribe({
    next:(response)=>{
      console.log('products' + response.data)
      this.products = response.data
    }
  })
  this._ProductService.getCategories().subscribe({
    next:(response)=>{
      console.log('categories' + response.data)
      this.categories = response.data
    }
  })
}

addProduct(id:string,element:HTMLButtonElement):void{

  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      this._CartService.numOfCartItems.next(response.numOfCartItems)
      this.toastr.success(response.message)


    },
    error:(err)=>{
      console.log('error')
      this.toastr.error('Please login first')


    }
  })
}

categoryOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:6000,
  autoplaySpeed: 2000,
  navSpeed: 800,
  navText: ['', ''],
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 3
    },
    550: {
      items: 4
    },
    740: {
      items: 5
    },
    940: {
      items: 6
    }
  },
  nav: true
}

mainSlideOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 300,
  autoplay:true,
  autoplayTimeout: 5000,
  autoplaySpeed: 3000,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },

  },
  nav: false
}
}
