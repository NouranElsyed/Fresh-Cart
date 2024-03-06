import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ForgetpassService } from 'src/app/services/forgetpass.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent {
  constructor(private _ForgetpassService:ForgetpassService , private _Router:Router){}
  step1:boolean =true
  step2:boolean =false
  step3:boolean =false
  email:string  =''
  msgSuccess:string=''
  errMsg:string=''
forgetForm:FormGroup= new FormGroup({
  email:new FormControl(null,[
    Validators.required,Validators.email])
})
resetCodeForm:FormGroup= new FormGroup({
  resetCode:new FormControl(null,[
    Validators.required])
})
resetPasswordForm:FormGroup= new FormGroup({
  newPassword:new FormControl(null,[
    Validators.required,
    Validators.pattern(/^[A-Z][a-z0-9]{5,15}$/)])

})

forgetPassword():void{
  let userEmail=this.forgetForm.value
  this.email=userEmail.email
  this._ForgetpassService.forgetPassword(userEmail).subscribe({
  next:(Response)=>{
  console.log(Response);
  this.msgSuccess  = Response.message
  this.step1 = false
  this.step2 = true
  console.log(this.email);


},error:(err)=>{
  this.errMsg=err.error.message
}
  })
}
resetCode():void{
  let resetCodeNum=this.resetCodeForm.value

  this._ForgetpassService.resetCode(resetCodeNum).subscribe({
  next:(Response)=>{
  console.log(this.email);
  this.msgSuccess  = Response.status
  this.errMsg=''
  this.step1 = false
  this.step2 = false
  this.step3=true
},error:(err)=>{
  console.log(resetCodeNum);
  console.log(this.email);

  this.errMsg=err.error.message
  this.msgSuccess=''

}})}
newPassword():void{
  let resetForm = this.resetPasswordForm.value
  resetForm.email= this.email
  this._ForgetpassService.resetPassword(resetForm).subscribe({
  next:(Response)=>{
    if(Response?.token){
      localStorage.setItem(`_token`,Response.token)
      this._Router.navigate(['/home'])
    }
    console.log(Response);
    this.msgSuccess  = Response.status

  },error:(err)=>{
    this.errMsg=err.error.message
    console.log(resetForm);

  }


  })
}
}
