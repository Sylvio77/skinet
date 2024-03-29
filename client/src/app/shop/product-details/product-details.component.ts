import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product!:IProduct;
quantity=1;

constructor(private  ShopService:ShopService,private ActivatedRoute:ActivatedRoute,private bcService:BreadcrumbService,private basketService:BasketService){
  this.bcService.set('@productDetails','');
}

ngOnInit(){
  this.loadProduct();
}

loadProduct()
{
  this.ShopService.getProduct(Number(this.ActivatedRoute.snapshot.paramMap.get('id'))).subscribe(product=>{
  this.product=product;
  this.bcService.set('@productDetails',product.name);
  },error=>{
      console.log(error);
  });
}

addItemToBasket(){
  this.basketService.addItemToBasket(this.product,this.quantity)
}

incrementQuantity(){
  
  this.quantity++;
}

decrementQuantity(){
  if(this.quantity>1)
      this.quantity--;
}

}
