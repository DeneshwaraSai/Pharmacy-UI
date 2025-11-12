import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { DrugSetup, TaxCategory } from './drug.model';

@Injectable({
  providedIn: 'root',
})
export class DrugService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<DrugSetup[]> {
    return this.http.get<DrugSetup[]>(Environment.API_URL + 'drug/v1/all');
  }

  getById(id: number): Observable<DrugSetup> {
    return this.http.get<DrugSetup>(Environment.API_URL + `drug/v1/${id}`);
  }

  getTaxCategories(): Observable<TaxCategory[]> {
    return this.http.get<TaxCategory[]>(
      Environment.API_URL + 'taxCategory/v1/list'
    );
  }

  create(drugInfo: DrugSetup): Observable<DrugSetup> {
    return this.http.post<DrugSetup>(
      Environment.API_URL + `drug/v1/save`,
      drugInfo
    );
  }

  update(drugInfo: DrugSetup): Observable<DrugSetup> {
    return this.http.put<DrugSetup>(
      Environment.API_URL + `drug/v1/update`,
      drugInfo
    );
  }
}
