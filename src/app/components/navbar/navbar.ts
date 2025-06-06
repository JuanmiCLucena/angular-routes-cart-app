import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.html'
})

export class Navbar {

  @Input() items!: CartItem[];

  @Output() openEventEmitter = new EventEmitter();

  // Método para mostrar/ocultar el carrito
  // Enviamos una señal al componente padre para que ejecute un evento (no enviamos valores)
  // Así evitamos el error de que no conozca la propiedad openCart() en el componente hijo.
  // El padre es el encargado de manejar el estado de la propiedad showCart.
  openCart(): void {
    this.openEventEmitter.emit()
  }
}
