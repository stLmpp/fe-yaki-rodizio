import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetTableByIdDto } from '../models/get-table-by-id.dto';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TableService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + '/v1/tables';

  getTableById(tableId: string) {
    return this.http
      .get<{ table: GetTableByIdDto }>(`${this.baseUrl}/${tableId}`)
      .pipe(map((response) => response.table));
  }
}
