import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = this.environmentService.config.mainRestApiUrl;
  constructor(
    private readonly http: HttpClient,
    private readonly environmentService: EnvironmentService
  ) {}
  public signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/sign-in`, {
      username,
      password,
    });
  }
  public checkCurrentAuthStatus(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      const payload = this.decodeToken(token);
      if (!payload) {
        return false;
      }

      // Get current time and adjust by dividing by 1000 to convert to seconds (from milliseconds)
      const currentTime = Math.floor(new Date().getTime() / 1000);
      return payload.exp > currentTime;
    } else {
      return false;
    }
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
}
