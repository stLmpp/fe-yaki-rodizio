import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetCategoriesTreeDto } from '../models/get-categories-tree.dto';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + '/v1/products';

  getCategoriesTree() {
    return this.http
      .get<GetCategoriesTreeDto>(`${this.baseUrl}/categories-tree`)
      .pipe(map((response) => response.productCategories));
  }
}
