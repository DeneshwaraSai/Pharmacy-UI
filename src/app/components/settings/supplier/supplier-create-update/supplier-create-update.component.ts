import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SupplierService } from '../supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Supplier } from '../supplier.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MasterData, SimpleCodeValue } from '../../../master_data';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-supplier-create-update',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    JsonPipe
  ],
  templateUrl: './supplier-create-update.component.html',
  styleUrl: './supplier-create-update.component.scss',
  providers: [SupplierService],
})
export class SupplierCreateUpdateComponent {
  supplierForm!: FormGroup;
  matSnackbar = inject(MatSnackBar);
  statusCodeValue: SimpleCodeValue[] = MasterData.SUPPLIER_STATUS;

  constructor(
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((result) => {
      const idStr = result.get('id');
      if (idStr) {
        const id = Number(idStr);

        this.supplierService.getSupplierById(id).subscribe((res: Supplier) => {
          console.log(res);
          this.constructForm(res);
        });
      } else {
        this.constructForm(null);
      }
    });
  }

  constructForm(supplier: Supplier | null) {
    this.supplierForm = this.fb.group({
      id: [supplier?.id || null],
      name: [supplier?.name || '', Validators.required],
      code: [supplier?.code || '', Validators.required],
      accountNumber: [supplier?.accountNumber || ''],
      accountHolderName: [supplier?.accountHolderName || ''],
      ifscCode: [supplier?.ifscCode || ''],
      taxNumber: [supplier?.taxNumber || ''],
      licenceNumber: [supplier?.licenceNumber || ''],
      email: [supplier?.email || '', [Validators.required, Validators.email]],
      phoneNumber: [supplier?.phoneNumber || '', Validators.required],
      status: [supplier?.status || '', Validators.required],
    });
  }

  onCancel() {
    this.route.navigateByUrl('settings/supplier/dashboard');
  }

  onSubmit() {
    const supplierInfo: Supplier = this.supplierForm.value;
    console.log(supplierInfo);
    if (supplierInfo.id) {
      this.supplierService.updateSupplier(supplierInfo).subscribe({
        next: (res: Supplier) => {
          this.matSnackbar.open('updated Successfully', 'Supplier Info');
          this.route.navigateByUrl('/settings/supplier/dashboard');
        },
        error: (error: Error) => {},
      });
    } else {
      this.supplierService.saveSupplier(supplierInfo).subscribe({
        next: (res: Supplier) => {
          this.matSnackbar.open('saved Successfully', 'Supplier Info');
          this.route.navigateByUrl('/settings/supplier/dashboard');
        },
        error: (error: Error) => {},
      });
    }
  }
}
