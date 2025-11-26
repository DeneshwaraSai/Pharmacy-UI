import { Component, ViewChild } from '@angular/core';
import { PatientHeaderComponent } from '../../patient-header/patient-header/patient-header.component';
import { PatientHeaderContext } from '../../patient-header/patient-header.model';
import { PatientContext } from '../../context.service';
import { Router } from '@angular/router';
import { OrderInfo, OrderLineItem } from './new-order.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    PatientHeaderComponent,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgGridAngular,
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
})
export class NewOrderComponent {
  patientContextHeader: PatientHeaderContext | null = null;
  newOrder!: OrderInfo;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  selectedRows: OrderLineItem[] = [];
  rowData: OrderLineItem[] = [];

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

  colDefs: any = [
    {
      field: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 30,
    },
    { field: 'drugName', editable: true },
    { field: 'supplierName' },
    { field: 'batchNumber' },
    { field: 'expiryDate' },
    { field: 'unitPrice' },
    { field: 'quantity', editable: true, cellEditor: 'agNumberCellEditor' },
    { field: 'totalPrice' },
    { field: 'discountPerc', editable: true, cellEditor: 'agNumberCellEditor' },
    {
      field: 'discountAmount',
      editable: true,
      cellEditor: 'agNumberCellEditor',
    },
    { field: 'netAmount' },
  ];

  addItem() {
    const newOrderItem: OrderLineItem = {
      drugName: '',
      supplierName: '',
      batchNumber: '',
      expiryDate: '',
      unitPrice: 0,
      quantity: 0,
      totalPrice: 0,
      discountPerc: 0,
      discountAmount: 0,
      netAmount: 0,
    };

    this.rowData.push(newOrderItem);

    if (this.agGrid?.api) {
      // use ag-Grid transaction API to add the new row so the grid updates cleanly
      this.agGrid.api.applyTransaction({ add: [newOrderItem] });
    } else {
      // fallback: update the rowData reference so any bindings detect the change
      this.rowData = [...this.rowData];
    }
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

  submitOrder() {
    
  }
}
