import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../types/login.request';
import { TokenResponse } from '../types/token.response';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  baseUrl: string = environment.authUrl;

  private readonly toast = toast;

  constructor() {}

  showError(message: string): void {
    this.toast.error(message, { duration: 5000 });
  }

  showSuccess(message: string): void {
    this.toast.success(message, { duration: 3000 });
  }
}
