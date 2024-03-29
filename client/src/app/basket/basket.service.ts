import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IbasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl="https://localhost:7047/api/";
  private basketSource=new BehaviorSubject<IBasket>(null!);
  basket$=this.basketSource.asObservable();
  private basketTotalSource=new BehaviorSubject<IbasketTotals>(null!);
  basketTotal$=this.basketTotalSource.asObservable();
  constructor(private http: HttpClient) { }

  getBasket(id:string){ 
    return this.http.get(this.baseUrl+'basket?id='+id)
    .pipe(
      map((basket:IBasket |any) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    )
  }

  setBasket(basket:IBasket){
    return this.http.post(this.baseUrl+'basket',basket).subscribe((response: IBasket|any) => {
      this.basketSource.next(response);
      this.calculateTotals();
    },
   error=>{ 
           console.log(error);
      });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

addItemToBasket(items:IProduct,quantity=1){
const itemToAdd:IBasketItem=this.mapProductItemToBasketItem(items,quantity);
const basket=this.getCurrentBasketValue() ?? this.createBasket();
basket.items=addOrUpdateItem(basket.items,itemToAdd,quantity); 
this.setBasket(basket);
}

incrementItemQuantity(item:IBasketItem){
  const basket=this.getCurrentBasketValue();
  const foundItemIndex=basket.items.findIndex(x=>x.id===item.id);
  basket.items[foundItemIndex].quantity++;
  this.setBasket(basket);
}
 
decrementItemQuantity(item:IBasketItem){
  const basket=this.getCurrentBasketValue();
  const foundItemIndex=basket.items.findIndex(x=>x.id===item.id);
  if(basket.items[foundItemIndex].quantity>1){
    basket.items[foundItemIndex].quantity--;
    this.setBasket(basket);
  }else
  {
    this.removeQuantityFromBasket(item);
  }
}
  removeQuantityFromBasket(item: IBasketItem) {
    const basket=this.getCurrentBasketValue();
    if(basket.items.some(x=>x.id===item.id)){
      basket.items=basket.items.filter(i=>i.id!==item.id);
      if(basket.items.length>0){
        this.setBasket(basket);
      }
      else
      {
         this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl+ 'basket?id='+basket.id).subscribe(()=>{
      this.basketSource.next(null!);
      this.basketTotalSource.next(null!);
      localStorage.removeItem('basket_id');
    },error=>{console.log(error);
  })
  }

private calculateTotals() {
  const basket=this.getCurrentBasketValue();
  const shipping=0;
  const subtotal=basket.items.reduce((a,b)=>(b.price * b.quantity) + a,0);
  const total=subtotal+shipping;
  this.basketTotalSource.next({shipping,total,subtotal}) 
}

 private createBasket(): IBasket {
   const basket=new Basket();
   localStorage.setItem('basket_id',basket.id);
   return basket;
  }

  mapProductItemToBasketItem(items: IProduct, quantity: number): IBasketItem {
   return{
        id:items.id,
        productName:items.name,
        price:items.price,
        pictureUrl:items.pictureUrl,
        quantity,
        brand:items.productBrand,
        type:items.productType
   };
  }

}
 
function addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
 const index=items.findIndex(i=>i.id==itemToAdd.id);
 if(index===-1)
 {
   itemToAdd.quantity=quantity;
   items.push(itemToAdd)
 }
 else
 {
   items[index].quantity+=quantity;
 }
 return items;
}
  