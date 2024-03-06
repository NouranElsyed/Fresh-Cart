import { Component } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
constructor(private _ProductService:ProductService){}
categories:Category[] =[];

  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next:(response)=>{
        console.log('categories' + response.data)
        this.categories = response.data
      }
    })
  }

}
