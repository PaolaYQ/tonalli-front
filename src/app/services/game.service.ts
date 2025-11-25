import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../env/enviroment';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/games`;

  startHotPotato(classCode: string) {
    return this.http.post<void>(`${this.apiUrl}/start/${classCode}`, {});
  }
}
