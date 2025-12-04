import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../env/enviroment';
import { LoginRequest } from '../types/login.request';
import { TokenResponse } from './../types/token.response';
import RegisterTeacherComponent from '../pages/auth/register-teacher/register-teacher.component';
import { RegisterTeacherRequest } from '../types/register.types';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  baseUrl: string = `${environment.baseUrl}/enrollment`;

  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService
  ) {}

  enroll(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
