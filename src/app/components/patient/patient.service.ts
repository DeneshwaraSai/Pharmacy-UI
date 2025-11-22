import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient.model';
import { Environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}
  savePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(
      Environment.API_URL + 'patient/v1/save',
      patient
    );
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(Environment.API_URL + `patient/v1/${id}`);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(
      Environment.API_URL + 'patient/v1/update',
      patient
    );
  }
}
