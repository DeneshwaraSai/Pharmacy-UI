import { Component, Input, signal, WritableSignal } from '@angular/core';
import { PatientHeaderService } from '../patient-header.service';
import { AgGridAngular } from 'ag-grid-angular';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {
  PatientHeaderContext,
  PatientSearchDto,
} from '../patient-header.model';
import { PatientContext } from '../../context.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-search',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    AgGridAngular,
    HttpClientModule,
  ],
  templateUrl: './patient-search.component.html',
  styleUrl: './patient-search.component.scss',
  providers: [PatientHeaderService],
})
export class PatientSearchComponent {
  @Input() patient: PatientHeaderContext | null = null;
  pageType: string | null = '';
  selectedRows: PatientSearchDto[] = [];
  patientSearchDetailsList: PatientSearchDto[] = [
    {
      uhid: 123,
      firstName: 'John',
      lastName: 'Doe',
      sequenceNumber: '123',
      billNumber: 'B001',
      phoneNumber: '9876543210',
      orderDate: new Date(),
      dueAmount: 123,
      status: 'Open',
      patientId: 0,
      gender: '',
      orderNumber: '',
      amountPaid: 0,
    },
  ];

  hasPatientContext: WritableSignal<boolean> = signal(false);
  date: Date = new Date();
  patientSearchForm!: FormGroup;

  colDefs: any[] = [
    {
      field: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { field: 'uhid' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'sequenceNumber' },
    { field: 'billNumber' },
    { field: 'phoneNumber' },
    { field: 'orderDate' },
    { field: 'dueAmount' },
    { field: 'status' },
  ];

  defaultColDef = {
    flex: 1,
  };

  constructor(
    private fb: FormBuilder,
    private patientHeaderService: PatientHeaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((res) => {
      this.pageType = res.get('pageType');
    });

    const patient = PatientContext.getPatientHeader();

    if (patient) {
      this.patient = patient;
      this.hasPatientContext.set(true);
    } else {
      this.patientSearchForm = this.fb.group({
        firstName: [''],
        middleName: [''],
        lastName: [''],
        phoneNumber: [''],
        uhid: [null],
        email: [''],
      });
      this.hasPatientContext.set(false);
    }
  }

  getInitials(name1: string, name2: string): string {
    if (!name1 && !name2) return '';
    const firstChar = name1?.charAt(0) || '';
    const lastChar = name2?.charAt(0) || '';
    return (firstChar + lastChar).toUpperCase();
  }

  onCancel() {
    this.patientSearchForm.reset();
  }

  onSubmit() {
    const patientSearch = this.patientSearchForm.value;

    this.patientHeaderService
      .getPatientByAdvancedSearch(patientSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.patientSearchDetailsList = res;
        },
        error: (error) => {},
      });
  }

  onContinue() {
    if (this.selectedRows && this.selectedRows.length > 0) {
      console.log(this.selectedRows[0]);
      this.patientHeaderService
        .getPatientHeaderByUhid(this.selectedRows[0].uhid)
        .subscribe((res) => {
          if (this.pageType == 'patient') {
            this.router.navigateByUrl('edit-patient');
          } else if (this.pageType == 'order') {
            this.router.navigateByUrl('/new-order');
          }
        });
    }
  }

  onSelectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    console.log('Selected Rows:', selectedRows);
    this.selectedRows = selectedRows;
  }
}
