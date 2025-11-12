import { DatePipe } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { PatientContext } from '../../context.service';
import { PatientHeaderContext } from '../patient-header.model';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.scss',
})
export class PatientHeaderComponent {
  @Input() patient!: PatientHeaderContext;
  hasPatientContext: WritableSignal<boolean> = signal(false);
  date: Date = new Date();
  constructor() {
    const patient = PatientContext.getPatientHeader();
    if (patient) {
      this.patient = patient;
    } else {
      this.hasPatientContext.set(true);
    }
  }

  getInitials(name1: string, name2: string): string {
    if (!name1 && !name2) return '';
    const firstChar = name1?.charAt(0) || '';
    const lastChar = name2?.charAt(0) || '';
    return (firstChar + lastChar).toUpperCase();
  }
}
