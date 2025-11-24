import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../env/enviroment';
import { AssignmentsList } from '../types/assignment.types';
import { ToastService } from './toast.service';
import { Activity } from '../types/activities.types';
import { Attemp, SubmitAttemptRequest } from '../types/atemp.types';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly baseUrl: string = `${environment.baseUrl}/student`;

  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService
  ) {}

  getAssignedActivities(): Observable<AssignmentsList> {
    return this.http.get<AssignmentsList>(`${this.baseUrl}/my-activities`);
  }

  getActivity(idAssignment: number): Observable<Activity> {
    return this.http.get<Activity>(
      `${this.baseUrl}/assignment/${idAssignment}/quiz`
    );
  }

  postAtemp(data: SubmitAttemptRequest): Observable<Attemp> {
    return this.http
      .post<Attemp>(`${this.baseUrl}/attempt`, data)
      .pipe(tap((response) => this.toastService.showSuccess(response.mensaje)));
  }
}
