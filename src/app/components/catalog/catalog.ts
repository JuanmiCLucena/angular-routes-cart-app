import { Component, EventEmitter, OnInit} from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data';
import { ProductService } from '../../services/product';

@Component({
  selector: 'catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html'
})
export class Catalog implements OnInit {

  products!: Product[];


  constructor(private sharingDataService: SharingDataService, private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.findAll();
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }

}
