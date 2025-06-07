import { Routes } from '@angular/router';
import { Cart } from './components/cart/cart';
import { Catalog } from './components/catalog/catalog';

export const routes: Routes = [
    // Enlazamos una ruta a un componente
    { path: '', redirectTo: '/catalog', pathMatch: 'full'},
    { path: 'cart', component: Cart},
    {path: 'catalog', component: Catalog}
];
