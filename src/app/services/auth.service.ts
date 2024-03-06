import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo:any;
  constructor(private _httpClient:HttpClient) { }

  signUp(info:User) : Observable<any>{
  return  this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', info)
  }
  signIn(info:User) : Observable<any>{
    return  this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', info)
    }
    decodeUser():void{
      const encode = localStorage.getItem('getToken')
      if(encode !==null){
        const decode = jwtDecode(encode)
        this.userInfo=decode
        console.log(decode);

      }

    }
}