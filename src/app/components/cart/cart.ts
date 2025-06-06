import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html'
})
export class Cart {

  
  items!: CartItem[];

  total: number = 0;
  
  idProductEventEmitter = new EventEmitter();
  
  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

}
