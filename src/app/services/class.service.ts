import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/enviroment';

import { AddClassForm, ClassCard, ClassInfo } from '../types/class.types';
import { StudentInfo } from '../types/student.types';
import { ActivityResponse } from '../types/activities.types';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.baseUrl}/classes`;

  addClass(data: AddClassForm): Observable<ClassCard> {
    return this.http.post<ClassCard>(`${this.apiUrl}`, data);
  }

  getClassInfo(classCode: string): Observable<ClassInfo> {
    return this.http.get<ClassInfo>(`${this.apiUrl}/${classCode}`);
  }

  getTopStudents(classCode: string): Observable<StudentInfo[]> {
    return this.http.get<StudentInfo[]>(
      `${this.apiUrl}/${classCode}/top-students`
    );
  }

  getActivities(clasCode: string): Observable<ActivityResponse[]>{
    return this.http.get<ActivityResponse[]>(`${this.apiUrl}/${clasCode}/activities`)
  }
}
