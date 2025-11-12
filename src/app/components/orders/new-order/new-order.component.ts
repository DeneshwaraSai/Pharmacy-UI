import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../patient-header/patient-header/patient-header.component';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [PatientHeaderComponent],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
})
export class NewOrderComponent {
 
}
