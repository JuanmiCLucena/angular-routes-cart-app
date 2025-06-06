import { Routes } from '@angular/router';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
    // Enlazamos una ruta a un componente
    { path: 'cart', component: Cart}
];
