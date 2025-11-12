import { Component, inject, OnInit } from '@angular/core';
import { MasterData, SimpleCodeValue } from '../../../master_data';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { DrugService } from '../drug.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DrugSetup, TaxCategory } from '../drug.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-drug',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-drug.component.html',
  styleUrl: './create-drug.component.scss',
  providers: [DrugService],
})
export class CreateDrugComponent implements OnInit {
  matSnackbar = inject(MatSnackBar);
  drugInfoForm!: FormGroup;

  drugTyoeCodeValue: SimpleCodeValue[] = MasterData.DRUG_TYPE;
  statusCodeValue: SimpleCodeValue[] = MasterData.DRUG_STATUS;
  taxCategoryCodeValue: TaxCategory[] = [];
  drugId: Number | null = null;
  constructor(
    private FormBuilder: FormBuilder,
    private drugService: DrugService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  async ngOnInit() {
    this.constructForm(null);
    this.taxCategoryCodeValue = await lastValueFrom(
      this.drugService.getTaxCategories()
    );

    this.router.paramMap.subscribe((res) => {
      const idStr = res.get('id');
      if (idStr) {
        const id = Number(idStr);
        this.drugId = id;
        this.drugService.getById(id).subscribe((res: DrugSetup) => {
          console.log(res);
          this.constructForm(res);
        });
      } else {
        this.constructForm(null);
      }
      console.log(res.get('id'));
    });
  }

  disableName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (parent && parent.get('id')?.value) {
        control.disable({ emitEvent: true });
        return null;
      }
      return null;
    };
  }

  constructForm(drugInfo: DrugSetup | null) {
    this.drugInfoForm = this.FormBuilder.group({
      id: [drugInfo ? drugInfo.id : null],
      name: [
        drugInfo ? drugInfo.name : '',
        [Validators.required],
      ],
      type: [drugInfo ? drugInfo.type : '', [Validators.required]],
      unitsPerPack: [drugInfo ? drugInfo.unitsPerPack : null],
      hsnCode: [drugInfo ? drugInfo.hsnCode : '', [Validators.required]],
      cgst: [drugInfo ? drugInfo.cgst : null],
      igst: [drugInfo ? drugInfo.igst : null],
      sgst: [drugInfo ? drugInfo.sgst : null],
      status: [drugInfo ? drugInfo.status : '', [Validators.required]],
      composition: [drugInfo ? drugInfo.composition : ''],
      genericName: [drugInfo ? drugInfo.genericName : ''],
    });
  }

  submit() {
    const drugInfo: DrugSetup = this.drugInfoForm.value;
    console.log(drugInfo);
    if (drugInfo.id) {
      this.drugService.update(drugInfo).subscribe({
        next: (res: DrugSetup) => {
          this.matSnackbar.open('updated Successfully', 'Drug Info');
          this.route.navigateByUrl('/settings/drug/dashboard');
        },
        error: (error: Error) => {},
      });
    } else {
      this.drugService.create(drugInfo).subscribe({
        next: (res: DrugSetup) => {
          this.matSnackbar.open('saved Successfully', 'Drug Info');
          this.route.navigateByUrl('/settings/drug/dashboard');
        },
        error: (error: Error) => {},
      });
    }
  }

  onChangeHSNCode(codeValue: TaxCategory) {
    this.drugInfoForm.controls['cgst'].setValue(codeValue.cgst);
    this.drugInfoForm.controls['sgst'].setValue(codeValue.sgst);
    this.drugInfoForm.controls['igst'].setValue(codeValue.igst);
  }

  onCancel() {
    this.route.navigateByUrl('/settings/drug/dashboard');
  }
}
