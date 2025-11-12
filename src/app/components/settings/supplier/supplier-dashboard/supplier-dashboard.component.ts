import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SupplierService } from '../supplier.service';
import { Supplier } from '../supplier.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
  ],
  templateUrl: './supplier-dashboard.component.html',
  styleUrl: './supplier-dashboard.component.scss',
  providers: [SupplierService],
})
export class SupplierDashboardComponent {
  supplierSetupList: Supplier[] = [];

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private supplierService: SupplierService
  ) {
    this.supplierService
      .getAllSuppliers()
      .subscribe((supplierSetupList: Supplier[]) => {
        if (supplierSetupList) this.supplierSetupList = supplierSetupList;
      });
  }

  create() {
    this.route.navigateByUrl('settings/supplier/create');
  }

  edit(id: number) {
    this.route.navigateByUrl(`settings/supplier/update/${id}`);
  }
}
