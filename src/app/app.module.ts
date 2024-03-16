import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import{BrowserAnimationsModule} from'@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { CategoryDetailsComponent  } from './pages/categoryDetails/categoryDetails.component';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { MyhttpInterceptor } from './interceptors/myhttp.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SearchPipe } from './pipe/search.pipe';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { BrandsComponent } from './pages/brands/brands.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    SignOutComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    OrdersComponent,
    CategoryDetailsComponent,
    ForgetPassComponent,
    PaymentComponent,
    AllordersComponent,
    SearchPipe,
    WishlistComponent,
    BrandsComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CarouselModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
}),
      NgxSpinnerModule

  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:MyhttpInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
