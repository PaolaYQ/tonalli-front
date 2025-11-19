import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../env/enviroment';
import { LoginRequest } from '../types/login.request';
import { TokenResponse } from './../types/token.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.authUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService
  ) {}

  login(data: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/login`, data).pipe(
      tap((response: TokenResponse) => {
        this.toastService.showSuccess('Inicio de sesión exitoso');
        localStorage.setItem('token', response.token);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
