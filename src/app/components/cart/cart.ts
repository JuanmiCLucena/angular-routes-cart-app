import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html'
})
export class Cart {

  
  items!: CartItem[];

  total: number = 0;
  
  // Inyectamos Router y el servicio sharingDataService que tiene un getter del EventEmitter idProduct.
  constructor(private router: Router, private sharingDataService: SharingDataService) {
    // Obtenemos el estado de la navegación actual gracias al componente Router de angular.
    // ? indica que podría ser null
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }
  
  onDeleteCart(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }

}
