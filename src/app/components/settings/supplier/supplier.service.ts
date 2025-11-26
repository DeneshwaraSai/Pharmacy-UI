import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { Supplier } from './supplier.model';
import { SimpleCodeValue } from '../../master_data';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(
      Environment.API_URL + 'supplier/v1/supplier-list'
    );
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(Environment.API_URL + `supplier/v1/${id}`);
  }

  saveSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(
      Environment.API_URL + 'supplier/v1/create',
      supplier
    );
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(
      Environment.API_URL + 'supplier/v1/update',
      supplier
    );
  }

  getSupplierCodeValue(): Observable<SimpleCodeValue[]> {
    return this.http.get<SimpleCodeValue[]>(
      Environment.API_URL + 'supplier/v1/codeValue'
    );
  }
}
