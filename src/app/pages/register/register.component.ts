import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  apiError:string='';
  isLoading: Boolean = false;
  registerForm:FormGroup= new FormGroup({
    name: new FormControl(null,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]),
     email: new FormControl(null,[
      Validators.required,
      Validators.email]),
     password: new FormControl(null,[
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,15}$/)]),
     rePassword: new FormControl(null,[
      RxwebValidators.compare({fieldName:'password'})]),
     phone: new FormControl(null,[
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

constructor(private  _authService:AuthService , private _Router:Router){}

  register(form:FormGroup){
  this.apiError='';

  if(form.valid  && !this.isLoading){
    this.isLoading=true
    this._authService.signUp(form.value).subscribe({
      next: (data) =>{
        console.log(data)
        if(data.message=="success"){
        this.isLoading = false
        this._Router.navigate(['/login'])
        }
      },
      error:(err) =>{
        console.log(err)
        this.apiError=err.error.message;


      }

    })
  }
  }
}
