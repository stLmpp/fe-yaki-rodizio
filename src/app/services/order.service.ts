import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetOrder } from '../models/get-order';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + '/v1/orders';

  getOrder(orderId: string) {
    return this.http
      .get<{ order: GetOrder }>(`${this.baseUrl}/${orderId}`)
      .pipe(map((response) => response.order));
  }
}
