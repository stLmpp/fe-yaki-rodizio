import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetLatestRoundDto } from '../models/get-latest-round.dto';
import { HttpError, HttpErrorCode } from '../models/http-error';
import { catchHttpError } from '../shared/catch-http-error';
import { map } from 'rxjs';
import { GetRoundWithItemsDto } from '../models/get-round-with-items.dto';

@Injectable({ providedIn: 'root' })
export class RoundService {
  private readonly path = environment.apiUrl + '/v1/rounds';
  private readonly http = inject(HttpClient);

  getLatestRound(tableId: string) {
    return this.http
      .get<{ round: GetLatestRoundDto }>(`${this.path}/tables/${tableId}/latest`)
      .pipe(
        map((response) => response.round),
        catchHttpError((error: HttpError) => {
          if (error.code === HttpErrorCode.round.roundNotFound) {
            return null;
          }
        }),
      );
  }

  getRoundWithItems(roundId: string) {
    return this.http
      .get<{ round: GetRoundWithItemsDto }>(`${this.path}/${roundId}/items`)
      .pipe(map((response) => response.round));
  }
}
