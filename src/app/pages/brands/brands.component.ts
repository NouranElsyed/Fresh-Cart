import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/interfaces/brands';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
  brandData:Brands[]=[]
  constructor(private  _ProductService:ProductService){}
  ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next:(response)=>{
        console.log('brands' + response.data)

        this.brandData=response.data
      }
    })
  }

}
