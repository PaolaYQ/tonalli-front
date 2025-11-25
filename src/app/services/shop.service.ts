import { inject, Injectable } from '@angular/core';
import { environment } from '../../env/enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ShopResponse } from '../types/shop.types';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/shop`;

  getShop() {
    return this.http.get<ShopResponse>(this.apiUrl);
  }

  buyItem(itemId: number) {
    return this.http.post(`${this.apiUrl}/buy/${itemId}`, {});
  }

  saveAvatar(payload: { itemsEquipadosIds: number[]; imagenBase64: string }) {
    return this.http.put(`${this.apiUrl}/avatar`, payload);
  }
}
