import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  apiError:string='';
  isLoading: Boolean = false;

  loginForm:FormGroup= new FormGroup({
     email: new FormControl(null,[
      Validators.required,
      Validators.email]),
     password: new FormControl(null,[
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,15}$/)]),

  })

constructor(private  _authService:AuthService , private _Router:Router){}

  login(form:FormGroup){
  this.apiError='';

  if(form.valid  && !this.isLoading){
    this._authService.signIn(form.value).subscribe({
      next: (data) =>{
        console.log(data)
        if(data.message=="success"){
        this._Router.navigate(['/home'])
        this.isLoading = false
        localStorage.setItem('getToken',data.token)
        this._authService.decodeUser()
        }
      },
      error:(err) =>{
        console.log(err)
        this.apiError=err.error.message;
        this.isLoading = false

      }

    })
  }
  }


}
