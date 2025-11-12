import { PatientHeaderContext } from './patient-header/patient-header.model';


export class PatientContext {
  static setPatientHeader(patientHeader: PatientHeaderContext) {
    localStorage.setItem('patientHeader', JSON.stringify(patientHeader));
  }

  static getPatientHeader(): PatientHeaderContext | null {
    const stored = localStorage.getItem('patientHeader');
    if (!stored) {
      return null; // or return a default object
    }
    return JSON.parse(stored) as PatientHeaderContext;
  }
}
