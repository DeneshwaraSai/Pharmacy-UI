import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from './inventory.model';
import { Environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  createInventory(inventory: Inventory): Observable<Inventory> {
    
    return this.http.post<Inventory>(
      Environment.API_URL + 'inventory/create',
      inventory,
    );
  }
}
