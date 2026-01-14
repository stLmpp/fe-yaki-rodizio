import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LatestRoundDto } from '../models/latest-round.dto';
import { HttpError, HttpErrorCode } from '../models/http-error';
import { catchHttpError } from '../shared/catch-http-error';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoundService {
  private readonly path = environment.apiUrl + '/v1/rounds';
  private readonly http = inject(HttpClient);

  getLatestRound(tableId: string) {
    return this.http.get<{ round: LatestRoundDto }>(`${this.path}/tables/${tableId}/latest`).pipe(
      map((response) => response.round),
      catchHttpError((error: HttpError) => {
        console.log(error);
        if (error.code === HttpErrorCode.RoundNotFound) {
          return null;
        }
      }),
    );
  }
}
