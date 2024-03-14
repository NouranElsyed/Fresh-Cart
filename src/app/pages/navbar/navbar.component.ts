import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  islogin:boolean = false

  constructor(private _Router:Router, private _AuthService:AuthService){
    _AuthService.getToken.subscribe({
      next:(data)=>{
        console.log(_AuthService.getToken.getValue());
        if(_AuthService.getToken.getValue()){
          this.islogin=true
        }else{
          this.islogin=false

        }

      }
    })

  }

  signOut():void{
    localStorage.removeItem('getToken')
    this._Router.navigate(['/login'])
  }


}
