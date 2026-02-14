import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgGridAngular } from 'ag-grid-angular';
import {
  defaultInventoryDetails,
  Inventory,
  InventoryDetails,
} from './inventory.model';
import { Router } from '@angular/router';
import { SupplierService } from '../settings/supplier/supplier.service';
import { DrugService } from '../settings/drug/drug.service';
import { HttpClientModule } from '@angular/common/http';
import { SimpleCodeValue } from '../master_data';
import { DrugSelectComponent } from '../generic-ag-grid/drug-select/drug-select.component';
import { DrugSetup } from '../settings/drug/drug.model';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InventoryService } from './inventory.service';
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgGridAngular,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatAutocompleteModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
  providers: [SupplierService, DrugService, InventoryService],
})
export class InventoryComponent {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  selectedRows: InventoryDetails[] = [];
  rowData: InventoryDetails[] = [];
  supplierCodeList: SimpleCodeValue[] = [];
  drugList: DrugSetup[] = [];

  inventoryForm!: FormGroup;
  errorMessage: string[] = [];

  constructor(
    private router: Router,
    private supplierService: SupplierService,
    private drugService: DrugService,
    private fb: FormBuilder,
    private inventoryService: InventoryService,
  ) {
    this.inventoryForm = this.fb.group({
      invoiceDate: [new Date(), [Validators.required]],
      invoiceNumber: ['', [Validators.required]],
      invoiceAmount: [0.0, [Validators.required]],
      discountAmount: [0.0],
      discountPerc: [0.0],
      netAmount: [0.0],
      supplierCode: ['', [Validators.required]],
    });
    this.supplierService.getSupplierCodeValue().subscribe((res) => {
      console.log(res);
      this.supplierCodeList = res;
    });
    this.drugService.getAll().subscribe((res) => {
      console.log(res);
      this.drugList = res;
    });
  }

  colDefs: any = [
    {
      field: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 45,
    },
    {
      field: 'drugName',
      editable: true,
      cellEditor: DrugSelectComponent,
      cellEditorParams: (params: any) => ({
        codeValueList: this.drugList,
        drugId: params.data.drugCode,
      }),
      valueSetter: (params: any) => {
        const selected = params.newValue;
        if (!selected) return false;

        params.data.drugCode = selected.drugId;
        params.data.drugName = selected.name;
        params.data.hsnCode = selected.hsnCode;
        params.data.stripSize = selected.stripSize;
        params.api.refreshCells({ rowNodes: [params.node], force: true });
        return true;
      },

      valueFormatter: (params: any) => {
        return params.data.drugName || '';
      },
    },
    { field: 'batchNumber', editable: true, cellEditor: 'agTextCellEditor' },
    { field: 'expiryDate', editable: true, cellEditor: 'agDateCellEditor' },
    {
      field: 'quantity',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      valueSetter: (params: any) => {
        params.data.quantity = params.newValue;
        const data = this.updateParams(params.data);
        params.data = data;
        params.api.refreshCells({ rowNodes: [params.node], force: true });
        return true;
      },
    },
    {
      field: 'manufacturerRate',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      valueSetter: (params: any) => {
        params.data.manufacturerRate = params.newValue;
        const data = this.updateParams(params.data);
        params.data = data;
        params.api.refreshCells({ rowNodes: [params.node], force: true });
        return true;
      },
    },
    { field: 'totalManufacturerRate' },
    { headerName: 'Invoice Amount with Discounts', field: 'invoiceAmount' },
    { headerName: 'Net Amount with taxes', field: 'netAmount' },

    {
      field: 'sellingCost',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      valueSetter: (params: any) => {
        params.data.sellingCost = params.newValue;
        const data = this.updateParams(params.data);
        params.data = data;
        params.api.refreshCells({ rowNodes: [params.node], force: true });
        return true;
      },
    },
    { field: 'totalSellingCost' },
  ];

  updateParams(data: InventoryDetails) {
    const cgst: number = data.cgst || 0.0,
      sgst: number = data.sgst || 0.0;
    data.totalManufacturerRate = Number(
      parseFloat(String(data.quantity * data.manufacturerRate)).toFixed(2),
    );
    const cgstAmount = (data.totalManufacturerRate * cgst) / 100;
    const sgstAmount = (data.totalManufacturerRate * sgst) / 100;

    data.netAmount = Number(
      parseFloat(
        String(
          data.quantity * data.manufacturerRate + (cgstAmount + sgstAmount),
        ),
      ).toFixed(2),
    );
    // TODO : Add Discounts here

    data.invoiceAmount = Number(
      parseFloat(
        String(
          data.quantity * data.manufacturerRate + (cgstAmount + sgstAmount),
        ),
      ).toFixed(2),
    );
    data.totalSellingCost = Number(
      parseFloat(String(data.quantity * data.sellingCost)).toFixed(2),
    );

    this.inventoryForm.controls['netAmount'].setValue(
      this.rowData.reduce((sum, row) => sum + (row.netAmount || 0), 0),
    );
    this.inventoryForm.controls['invoiceAmount'].setValue(
      this.rowData.reduce((sum, row) => sum + (row.invoiceAmount || 0), 0),
    );

    return data;
  }

  addItem(newRow: any) {
    if (!newRow) newRow = structuredClone(defaultInventoryDetails);

    this.rowData.push(newRow);

    if (this.agGrid?.api) {
      this.agGrid.api.applyTransaction({ add: [newRow] });
    } else {
      this.rowData = [...this.rowData];
    }
  }

  updateAgGridByParam(param: any) {
    if (param != undefined)
      this.agGrid.api.applyTransaction({ update: [param] });
  }

  selectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    this.selectedRows = selectedRows;
  }

  deleteItem() {
    this.agGrid.api.applyTransaction({ remove: this.selectedRows });
    console.log(this.agGrid.api.getAllDisplayedColumns());
    this.selectedRows = [];

    const allRows: any[] = [];
    this.agGrid.api.forEachNode((node) => allRows.push(node.data));

    this.rowData = allRows;
  }

  onAutoCompleteSelect(codeValue: DrugSetup) {
    const newRow: InventoryDetails = {
      id: null,
      drugCode: codeValue.id,
      drugName: codeValue.name,
      batchNumber: '',
      expiryDate: new Date(),
      stripSize: codeValue.unitsPerPack,
      quantity: 1,
      hsnCode: codeValue.hsnCode,
      cgst: codeValue.cgst,
      sgst: codeValue.sgst,
      manufacturerRate: 0.0,
      totalManufacturerRate: 0.0,
      netAmount: 0.0,
      invoiceAmount: 0.0,
      sellingCost: 0.0,
      totalSellingCost: 0.0,
    };
    this.addItem(newRow);
    console.log(this.rowData);
  }

  validateInventory() {
    this.errorMessage = []; // reset errors

    const inventory: Inventory = this.inventoryForm.value;
    inventory.inventoryDetails = this.rowData;

    if (
      !inventory.inventoryDetails ||
      inventory.inventoryDetails.length === 0
    ) {
      this.errorMessage.push('At least one Inventory Detail is required.');
      return false;
    }

    // Required field validations
    if (!inventory.supplierCode?.trim()) {
      this.errorMessage.push('Supplier Code is required.');
    }

    if (!inventory.invoiceNumber?.trim()) {
      this.errorMessage.push('Invoice Number is required.');
    }

    if (!inventory.invoiceDate) {
      this.errorMessage.push('Invoice Date is required.');
    }

    // Amount validations
    if (inventory.discountPerc && inventory.discountPerc < 0) {
      this.errorMessage.push('Discount % cannot be negative.');
    }

    if (inventory.discountAmt && inventory.discountAmt < 0) {
      this.errorMessage.push('Discount Amount cannot be negative.');
    }

    if (inventory.invoiceAmt && inventory.invoiceAmt <= 0) {
      this.errorMessage.push('Invoice Amount must be greater than 0.');
    }

    console.log(inventory);
    console.log(this.errorMessage);

    return this.errorMessage.length === 0;
  }

  submitOrder() {
    const inventory: Inventory = this.inventoryForm.value;
    inventory.inventoryDetails = this.rowData;
    console.log(inventory);

    if (this.validateInventory())
      this.inventoryService.createInventory(inventory).subscribe(
        (res) => {},
        (error: Error) => {},
      );
  }
}
