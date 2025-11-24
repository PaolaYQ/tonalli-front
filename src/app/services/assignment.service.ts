import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../env/enviroment';
import {
  AssignmentRequest,
  AssignmentResponse,
} from '../types/assignment.types';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  baseUrl: string = `${environment.baseUrl}/assignments`;

  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService
  ) {}

  assignActivity(data: AssignmentRequest): Observable<AssignmentResponse> {
    return this.http
      .post<AssignmentResponse>(`${this.baseUrl}`, data)
      .pipe(tap((response) => this.toastService.showSuccess(response.mensaje)));
  }
}
