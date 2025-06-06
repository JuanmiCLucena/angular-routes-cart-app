import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.html'
})

export class Navbar {

  @Input() items!: CartItem[];
 
}
