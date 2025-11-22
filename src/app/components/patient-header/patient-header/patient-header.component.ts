import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { PatientContext } from '../../context.service';
import { PatientHeaderContext } from '../patient-header.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PatientHeaderService } from '../patient-header.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [
    DatePipe,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.scss',
  providers: [PatientHeaderService],
})
export class PatientHeaderComponent {
  @Input() patient: PatientHeaderContext | null = null;
  @Input() pageType: string = '';

  hasPatientContext: WritableSignal<boolean> = signal(false);
  date: Date = new Date();

  constructor(
    private router:Router
  ) {
    const patient = PatientContext.getPatientHeader();
    if (patient) {
      this.patient = patient;
      this.hasPatientContext.set(true);
    } else {
      this.hasPatientContext.set(false);
    }
  }

  getInitials(name1: string, name2: string): string {
    if (!name1 && !name2) return '';
    const firstChar = name1?.charAt(0) || '';
    const lastChar = name2?.charAt(0) || '';
    return (firstChar + lastChar).toUpperCase();
  }

  clearContext(){
    PatientContext.clearPatientHeader();
    this.router.navigateByUrl('/patient/search')
  }
}
