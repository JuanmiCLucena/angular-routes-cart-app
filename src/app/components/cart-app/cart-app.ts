import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { Catalog } from "../catalog/catalog";
import { Cart } from '../cart/cart';
import { CartItem } from '../../models/cart-item';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'cart-app',
  imports: [
    Catalog,
    Cart,
    Navbar
],
  templateUrl: './cart-app.html'
})
export class CartApp implements OnInit{

  // Productos que pasamos al sub-componente catalog. (Productos del catalogo)
  products: Product[] = [];

  // Items que pasamos al sub-componente cart. (Productos del carrito)
  items: CartItem[] = [];

  //total: number = 0;

  // Variable para mostrar/ocultar el carrito
  showCart: boolean = false;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem("cart")!) || [];
    //this.calculateTotal();
  }

  // Recibimos el producto del componente hijo para añadir al carrito
  onAddCart(product: Product) {

    // Comprobamos si el producto a añadir existe ya o no en el carrito
    const hasItem = this.items.find(item => item.product.id === product.id);
    
    // Si el producto ya está en el carrito
    if(hasItem) {
      this.items = this.items.map(item => {
        // Le sumamos 1 a la cantidad del producto en el carrito
        if(item.product.id === product.id) {
          return {
            ... item,
            quantity: item.quantity + 1
          }
        }

        // Si no no lo encuentra devuelve el item tal y como está (sin modificar)
        return item;
      })
    } else {
      this.items = [... this.items, { product: { ...product}, quantity: 1}];
    }

    //this.calculateTotal();
    //this.saveSession();
  }

  onDeleteCart(id: number) {
    // Buscamos el item dentro del carrito
    this.items = this.items.filter(item => item.product.id != id);

    // Para eliminar el último elemento del carrito con onChanges
    // Si no usamos esto no detecta el último elemento eliminado como un cambio
    // ya que el estado inicial del arreglo de items es un arreglo vacío.
    if(this.items.length == 0) {
      sessionStorage.removeItem('cart');
    }

    // Calculamos el total del carrito
    //this.calculateTotal();
    //this.saveSession();
  }

  // calculateTotal(): void {
  //   this.total = this.items.reduce( (total, item) => total + (item.product.price * item.quantity), 0);
  // }

  // saveSession(): void {
  //   sessionStorage.setItem("cart", JSON.stringify(this.items));
  // }

  // Método para mostrar/ocultar el carrito
  openCart(): void {
    this.showCart = !this.showCart;
  }

}
