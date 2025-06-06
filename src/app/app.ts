import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartApp } from './components/cart-app/cart-app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CartApp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = '3-cart-app';
}
