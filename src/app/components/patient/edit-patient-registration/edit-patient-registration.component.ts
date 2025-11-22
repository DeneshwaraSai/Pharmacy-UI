import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MasterData, SimpleCodeValue } from '../../master_data';
import { Patient } from '../patient.model';
import { PatientService } from '../patient.service';
import { PatientHeaderService } from '../../patient-header/patient-header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientHeaderComponent } from '../../patient-header/patient-header/patient-header.component';
import { PatientContext } from '../../context.service';
import { PatientHeaderContext } from '../../patient-header/patient-header.model';

@Component({
  selector: 'app-edit-patient-registration',
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
    PatientHeaderComponent,
    MatButtonModule,
  ],
  templateUrl: './edit-patient-registration.component.html',
  styleUrl: './edit-patient-registration.component.scss',
  providers: [PatientService, PatientHeaderService],
})
export class EditPatientRegistrationComponent {
  patientForm!: FormGroup;

  genderTypeCodeValue: SimpleCodeValue[] = MasterData.GENDER_TYPE;
  bloodTypeCodeValue: SimpleCodeValue[] = MasterData.BLOOD_TYPE;
  patientContextHeader: PatientHeaderContext | null = null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private patientHeaderService: PatientHeaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.patientContextHeader = PatientContext.getPatientHeader();
    if (
      this.patientContextHeader == null ||
      this.patientContextHeader == undefined
    ) {
      this.router.navigateByUrl('patient/search');
      return;
    }
    const date25YearsAgo = new Date();
    date25YearsAgo.setFullYear(date25YearsAgo.getFullYear() - 25);

    const patientId = this.patientContextHeader.id;
    if (patientId) {
      this.patientService.getPatientById(patientId).subscribe((res) => {
        if (res) {
          this.constructPatientForm(res);
        }
      });
    }
  }

  constructPatientForm(patient: Patient) {
    const date25YearsAgo = new Date();
    date25YearsAgo.setFullYear(date25YearsAgo.getFullYear() - 25);

    this.patientForm = this.fb.group({
      id: [patient.id],
      firstName: [patient.firstName || '', Validators.required],
      middleName: [patient.middleName || ''],
      lastName: [patient.lastName || '', Validators.required],
      gender: [patient.gender || '', Validators.required],
      phoneNumber: [patient.phoneNumber || '', Validators.required],
      uhid: [patient.uhid || null],
      dateOfBirth: [patient.dateOfBirth || null],
      email: [patient.email || '', Validators.email],
      address: this.fb.group({
        id: [patient?.address?.id || null],
        lineOne: [patient.address?.lineOne || '', Validators.maxLength(40)],
        lineTwo: [patient.address?.lineTwo || '', Validators.maxLength(40)],
        lineThree: [patient.address?.lineThree || '', Validators.maxLength(40)],
        city: [patient.address?.city || ''],
        district: [patient.address?.district || ''],
        state: [patient.address?.state || ''],
        country: [patient.address?.country || ''],
        postalCode: [patient.address?.postalCode || ''],
      }),

      age: [this.calculateAge(date25YearsAgo)],

      bloodType: [patient.bloodType],
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
    this.patientService.updatePatient(patient).subscribe({
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
