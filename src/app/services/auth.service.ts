import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { GetSessionDto } from '../models/get-session.dto';
import { PostSignInAnonymousDto } from '../models/post-sign-in-anonymous.dto';
import { SMALL_TTL_CACHE_DISABLE } from '../core/small-ttl-cache.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + '/v1/auth';

  getSession() {
    return this.http.get<GetSessionDto | null>(`${this.baseUrl}/get-session`, {
      context: new HttpContext().set(SMALL_TTL_CACHE_DISABLE, true),
    });
  }

  signInAnonymous() {
    return this.http.post<PostSignInAnonymousDto>(`${this.baseUrl}/sign-in/anonymous`, {});
  }
}
