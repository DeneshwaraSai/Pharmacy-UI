import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { DrugSetup } from '../../settings/drug/drug.model';

@Component({
  selector: 'app-drug-select',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './drug-select.component.html',
  styleUrl: './drug-select.component.scss',
})
export class DrugSelectComponent implements ICellEditorAngularComp {
  codeValueList: DrugSetup[] = [];
  drugCode: any;
  drugName: string = '';
  params: any;
  selectedDrug!: DrugSetup;

  agInit(params: any): void {
    this.params = params;
    this.codeValueList = params.codeValueList;
    this.drugCode = params.data.drugCode;
    this.drugName = params.data.drugName;
    const index = this.codeValueList.findIndex((drug: DrugSetup) => drug.id === params.drugCode);
    if (index != -1) {
      this.selectedDrug = this.codeValueList[index];
    }
  }

  getValue() {
    return this.selectedDrug;
  }

  refresh?(params: ICellEditorParams<any, any, any>): void {}

  onChange(codeValue: DrugSetup) {
    this.selectedDrug = codeValue;

    this.drugCode = codeValue.id;
    this.drugName = codeValue.name;
    this.params.data.drugCode = codeValue.id;
    this.params.data.drugName = codeValue.name;
    this.params.data.hsnCode = codeValue.hsnCode;
    this.params.data.cgst = codeValue.cgst;
    this.params.data.sgst = codeValue.sgst;
    console.log(this.params.data);
  }
}
