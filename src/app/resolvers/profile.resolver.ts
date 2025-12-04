import { routes } from './../pages/teacher/teacher.routing';
// ng g resolver resolvers/user
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from '../services/student.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResovler implements Resolve<any> {
  constructor(private studentService: StudentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = Number(route.paramMap.get('id'));
    return this.studentService.getActivity(id);
  }
}
