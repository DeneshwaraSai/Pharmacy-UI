import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SimpleCodeValue } from '../../master_data';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
  selector: 'app-supplier-select-editor-component',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule],
  template: `<mat-form-field appearance="fill">
    <mat-select placeholder="">
      @for( codeValue of codeValueList; track codeValue.code) {
      <mat-option [value]="codeValue.code" (click)="onChange(codeValue.code)">
        {{ codeValue.value }}
      </mat-option>
      }
    </mat-select>
  </mat-form-field>`,
})
export class SupplierSelectEditorComponentComponent
  implements ICellEditorAngularComp
{
  codeValueList: SimpleCodeValue[] = [];
  params: any;
  selectedCode: string = '';

  agInit(params: any): void {
    this.params = params;
    this.codeValueList = params?.supplierList;
    this.selectedCode = params.value;
    console.log(this.params);
  }

  getValue() {
    return this.selectedCode;
  }

  onChange(event: string) {
    console.log(event); 
    this.selectedCode = event;
  }
}
