import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){}

  cartId:string|null=''

  orderForm:FormGroup = new FormGroup({
    details:new FormControl(''),
    city:new FormControl(''),
    phone:new FormControl('')

  })
  handleForm():void{
    console.log(this.orderForm.value);
    this._CartService.checkOut(this.cartId,this.orderForm.value).subscribe({
      next:(response)=>{
        if(response.status =='success'){
          window.open(response.session.url,"self")
        }
      }
    })
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
       this.cartId= params.get('id')
       console.log(this.cartId);

      }
    })
  }
}
