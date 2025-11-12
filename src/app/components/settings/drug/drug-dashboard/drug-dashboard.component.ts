import { Component } from '@angular/core';
import { DrugService } from '../drug.service';
import { DrugSetup } from '../drug.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drug-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './drug-dashboard.component.html',
  styleUrl: './drug-dashboard.component.scss',
  providers: [DrugService],
})
export class DrugDashboardComponent {
  displayedColumns: string[] = [
    'name',
    'type',
    'hsnCode',
    'sgst',
    'cgst',
    'igst',
    'genericName',
    'status',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  drugSetupList: DrugSetup[] = [];

  constructor(private drugService: DrugService, private router: Router) {
    this.drugService.getAll().subscribe({
      next: (res: DrugSetup[]) => {
        this.drugSetupList = res;
      },
      error: (error: Error) => {},
    });
  }

  create() {
    this.router.navigateByUrl('settings/drug/create');
  }

  edit(id: number) {
    this.router.navigateByUrl(`settings/drug/update/${id}`);
  }
}
