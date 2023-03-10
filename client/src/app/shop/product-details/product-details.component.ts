import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product!:IProduct;

constructor(private  ShopService:ShopService,private ActivatedRoute:ActivatedRoute,private bcService:BreadcrumbService){
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

}
