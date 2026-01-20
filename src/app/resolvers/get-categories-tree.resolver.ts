import { ResolveFn } from '@angular/router';
import { ProductCategory } from '../models/get-categories-tree.dto';
import { inject } from '@angular/core';
import { ProductService } from '../services/product.service';

export function getCategoriesTreeResolver(): ResolveFn<ProductCategory[]> {
  return () => inject(ProductService).getCategoriesTree();
}
