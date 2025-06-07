import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Catalog } from "../catalog/catalog";
import { Cart } from '../cart/cart';
import { CartItem } from '../../models/cart-item';
import { Navbar } from "../navbar/navbar";
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data';
import Swal from 'sweetalert2'

@Component({
  selector: 'cart-app',
  imports: [
    Catalog,
    Cart,
    Navbar,
    RouterOutlet
],
  templateUrl: './cart-app.html'
})
export class CartApp implements OnInit{

  // Items que pasamos al sub-componente cart. (Productos del carrito)
  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private service: ProductService, 
    private sharingDataService: SharingDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem("cart")!) || [];
    this.calculateTotal();
    // Atento al evento (hacemos clic en eliminar) está suscrito al evento
    this.onDeleteCart();
    this.onAddCart();
  }

  // Recibimos el producto del componente hijo para añadir al carrito
  onAddCart() {
    this.sharingDataService.productEventEmitter.subscribe( product => {

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
  
      this.calculateTotal();
      this.saveSession();

      Swal.fire({
      title: "Shopping",
      text: "Nuevo producto agregado al carro",
      icon: "success"
    });

      // Esto es un redirect a cart, pero con el state (datos).
      this.router.navigate(['/cart'], {
         state: {items: this.items, total: this.total}
        })
    });

    

  }

  onDeleteCart() {
    // Obtenemos el id
    this.sharingDataService.idProductEventEmitter.subscribe( id => {

      Swal.fire({
        title: "Esta seguro que desea eliminar?",
        text: "Cuidado el item se eliminara del carro de compras",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borralo!"
      }).then((result) => {
        if (result.isConfirmed) {


          // Buscamos el item dentro del carrito
          this.items = this.items.filter(item => item.product.id != id);
      
          // Para eliminar el último elemento del carrito con onChanges
          // Si no usamos esto no detecta el último elemento eliminado como un cambio
          // ya que el estado inicial del arreglo de items es un arreglo vacío.
          if(this.items.length == 0) {
            sessionStorage.removeItem('cart');
          }
      
          // Calculamos el total del carrito
          this.calculateTotal();
          this.saveSession();
          // Para hacer un refresh tenemos que cambiar la ruta y volver a la página
          this.router.navigateByUrl('/', {skipLocationChange: true}).then( () => {
            this.router.navigate(['/cart'], {
               state: {items: this.items, total: this.total}
              })
          })

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito de compras",
            icon: "success"
          });
        }
      });


    });
  }

  calculateTotal(): void {
    this.total = this.items.reduce( (total, item) => total + (item.product.price * item.quantity), 0);
  }

  saveSession(): void {
    sessionStorage.setItem("cart", JSON.stringify(this.items));
  }

  // Método para mostrar/ocultar el carrito
  // openCart(): void {
  //   this.showCart = !this.showCart;
  // }

}
