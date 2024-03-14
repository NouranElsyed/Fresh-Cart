import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  islogin:boolean = false
  numOfCartItems:number=0

  constructor(private _Router:Router, private _AuthService:AuthService, private _CartService:CartService){
    _AuthService.getToken.subscribe({
      next:(data)=>{
        console.log(_AuthService.getToken.getValue());
        console.log('hi',);

        if(_AuthService.getToken.getValue()){
          this.islogin=true
        }else{
          this.islogin=false

        }

      }
    })
    this._CartService.numOfCartItems.subscribe(res=>{
      this.numOfCartItems=res
    })

  }

  signOut():void{
    localStorage.removeItem('getToken')
    this._Router.navigate(['/login'])
  }


}
