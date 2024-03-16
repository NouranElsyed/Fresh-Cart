import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guard/auth.guard';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CategoryDetailsComponent} from './pages/categoryDetails/categoryDetails.component';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { BrandsComponent } from './pages/brands/brands.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent,title:'Home'},
  {path:'cart',canActivate:[authGuard],component:CartComponent,title:'Cart'},
  {path:'wishlist',canActivate:[authGuard],component:WishlistComponent,title:'Wish List'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'register',component:RegisterComponent,title:'Register'},
  {path:'products',component:ProductsComponent,title:'Products'},
  {path:'product-details/:id',component:ProductDetailsComponent,title:'product details'},
  {path:'categories/:id',canActivate:[authGuard],component:CategoryDetailsComponent ,title:'category details'},
  {path:'allorders',canActivate:[authGuard],component:AllordersComponent,title:'allorders'},
  {path:'Categories',component:CategoriesComponent,title:'Categories'},
  {path:'brands',component:BrandsComponent,title:'Brands'},
  {path:'payment/:id',canActivate:[authGuard],component:PaymentComponent,title:'payment'},
  {path:'forgetPassword',component:ForgetPassComponent,title:'forget password'},
  {path:'**',component:NotFoundComponent,title:'Not Found'},





];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
