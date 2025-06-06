import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html'
})
export class Cart {

  
  items!: CartItem[];

  total: number = 0;
  
  idProductEventEmitter = new EventEmitter();

  // Inyectamos Router
  constructor(private router: Router) {
    // Obtenemos el estado de la navegación actual gracias al componente Router de angular.
    // ? indica que podría ser null
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }
  
  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

}
