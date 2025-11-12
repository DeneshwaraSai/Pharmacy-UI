import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MasterData, SimpleCodeValue } from '../../master_data';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { PatientService } from '../patient.service';
import { Patient } from '../patient.model';
import { HttpClientModule } from '@angular/common/http';
import { PatientHeaderService } from '../../patient-header/patient-header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-patient-registration',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    HttpClientModule,
  ],
  templateUrl: './new-patient-registration.component.html',
  styleUrl: './new-patient-registration.component.scss',
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    PatientService,
    PatientHeaderService
  ],
})
export class NewPatientRegistrationComponent {
  patientForm!: FormGroup;

  genderTypeCodeValue: SimpleCodeValue[] = MasterData.GENDER_TYPE;
  bloodTypeCodeValue: SimpleCodeValue[] = MasterData.BLOOD_TYPE;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private patientHeaderService: PatientHeaderService,
    private router: Router
  ) {
    const date25YearsAgo = new Date();
    date25YearsAgo.setFullYear(date25YearsAgo.getFullYear() - 25);

    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      uhid: [null],
      dateOfBirth: [null],
      email: ['', Validators.email],
      address: this.fb.group({
        lineOne: ['', Validators.maxLength(40)],
        lineTwo: ['', Validators.maxLength(40)],
        lineThree: ['', Validators.maxLength(40)],
        city: [''],
        district: [''],
        state: [''],
        country: [''],
        postalCode: [''],
      }),

      age: [this.calculateAge(date25YearsAgo)],

      bloodType: [''],
    });
  }

  onDateChange(event: any) {
    const age = this.calculateAge(event.target.value);
    this.patientForm.controls['age'].setValue(age);
  }

  calculateAge(dob: Date): string {
    const today = new Date();
    const birthDate = new Date(dob);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust negative days and months
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years, ${months} months, ${days} days`;
  }

  submit() {
    const patient = this.patientForm.value;
    this.patientService.savePatient(patient).subscribe({
      next: (res: Patient) => {
        console.log(res);
        this.patientHeaderService
          .getPatientHeaderByUhid(res.uhid)
          .subscribe((res) => {
            if (res) {
              this.router.navigateByUrl('/new-order');
            }
          });
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
    console.log(patient);
  }
}
