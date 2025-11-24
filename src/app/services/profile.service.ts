import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment';
import { Observable } from 'rxjs';
import { AvatarResponse } from '../types/profile.types';
import { HttpClient } from '@angular/common/http';
import { ClassCard } from '../types/class.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.baseUrl}/user`;
  constructor(private readonly http: HttpClient) {}

  getBasicInfoProfile(): Observable<AvatarResponse> {
    return this.http.get<AvatarResponse>(`${this.baseUrl}/profile`);
  }

  getClassesFromTeacher(): Observable<ClassCard[]> {
    return this.http.get<ClassCard[]>(`${this.baseUrl}/classes`);
  }
}
