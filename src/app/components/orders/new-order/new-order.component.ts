import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../patient-header/patient-header/patient-header.component';
import { PatientHeaderContext } from '../../patient-header/patient-header.model';
import { PatientContext } from '../../context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [PatientHeaderComponent],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
})
export class NewOrderComponent {
  patientContextHeader: PatientHeaderContext | null = null;

  constructor(private router: Router) {
    this.patientContextHeader = PatientContext.getPatientHeader();
    if (
      this.patientContextHeader == null ||
      this.patientContextHeader == undefined
    ) {
      this.router.navigateByUrl('order/search');
      return;
    }
  }
}
