import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { PatientHeaderContext } from './patient-header.model';
import { PatientContext } from '../context.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientHeaderService {
  constructor(private http: HttpClient) {}

  getPatientHeader(uhid: number): Observable<PatientHeaderContext> {
    return this.http.get<PatientHeaderContext>(
      Environment.API_URL + `patient/v1/uhid/${uhid}`
    );
  }

  getPatientHeaderByUhid(uhid: number): Observable<PatientHeaderContext> {
    return this.getPatientHeader(uhid).pipe(
      tap((patientHeaderContext: PatientHeaderContext) => {
        PatientContext.setPatientHeader(patientHeaderContext);
      }),
      catchError((error: Error) => {
        console.error(error);
        return of(null as unknown as PatientHeaderContext);
      })
    );
  }
}
